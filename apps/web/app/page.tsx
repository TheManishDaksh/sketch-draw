
export default function Home(){
    
  return (
    <div className="bg-black h-screen w-screen">
      <div className="text-white font-bold">
        Excalidraw
      </div>
      <div>
        <canvas ref={canvasRef} width={1240} height={520} style={{border:'1px solid white'}}></canvas>
      </div>
    </div>
  )
}
