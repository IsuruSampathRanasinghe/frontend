import { createClient } from "@supabase/supabase-js"

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwY3lzbXpidmNpaHhrd29jZGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNDI3ODIsImV4cCI6MjA3MTcxODc4Mn0.Cq1AoJM_T86o8Ry0uoSV0Yhl9ysFNzPj_Q81EnkHSUw"
const supabaseUrl = "https://kpcysmzbvcihxkwocdlo.supabase.co"

const supabase = createClient(supabaseUrl, anonKey)

/*
supabase.storage.from("images").upload(file.name, file, {
            upsert: false,
            cacheControl: 3600,
        }).then(
            ()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl
                console.log(publicUrl);
            }
        )
*/

export default function mediaUpload(file){
    return new Promise(
        (resolve, reject)=>{
            if(file == null){
                reject("No file selected")
            }else{
                const  timestamp = new Date().getTime();
                const fileName = timestamp+file.name

                supabase.storage
                .from("images")
                .upload(fileName, file, {
                    upsert: false,
                    cacheControl: "3600",
                }).then(()=>{
                    const publicUrl = supabase.storage
                        .from("images")
                        .getPublicUrl(fileName).data.publicUrl;
                    resolve(publicUrl);
                }).catch(
                    ()=>{
                        reject("An error occured")
                    }
                )
            }
        }
    )
}