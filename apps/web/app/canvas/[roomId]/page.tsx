import { RoomCanvas } from "../../../components";

export default async function CanvasPage({params}:{params:{ roomId : string}}){
    
  const roomId = (await params).roomId;
  return (
    <RoomCanvas roomId={roomId}/>
  )
}