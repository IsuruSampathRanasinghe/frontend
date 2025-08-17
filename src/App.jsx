import './App.css'
import ProductCard from './compnents/productCard'

function App() {

  return (
    <>

      <div className='h-[700px] w-[700px] border-[5px] flex justify-center items-center'>
        <div className='w-[600px] h-[600px] bg-yellow-300 flex flex-row justify-center items-center'>
          <div className='w-[100px] h-[100px] bg-red-500'></div>
          <div className='w-[100px] h-[100px] absolute top-[10px] right-[10px] bg-blue-500'></div>
          <div className='w-[100px] h-[100px] bg-green-500'></div>
          <div className='w-[100px] h-[100px] fixed right-[0px] bottom-[0px] bg-pink-500'></div>
          <div className='w-[100px] h-[100px] bg-gray-500'></div>
        </div>
      </div>

    </>
  )
}

export default App
