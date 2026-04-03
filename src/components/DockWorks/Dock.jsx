import { github } from "react-syntax-highlighter/dist/esm/styles/hljs"
import "./dock.scss"

const Dock = ({ setWindowState }) => {
  return (
    <footer className='Dock'>
        <div className="icon github" onClick={()=>{
          setWindowState(state=>({
            ...state, github:true,
          }))
        }}><img src="./Dock-icons/github.svg" alt="" /></div>
        <div className="icon note" onClick={()=>{
          setWindowState(state=>({
            ...state, notes:true,
          }))
        }}><img src="./Dock-icons/note.svg" alt="" /></div>
        <div className="icon pdf" onClick={()=>{
          setWindowState(state=>({
            ...state, resume:true,
          }))
        }}><img src="./Dock-icons/pdf.svg" alt="" /></div>
        <div className="icon calender" ><img src="./Dock-icons/calender.svg" alt="" /></div>
        <div className="icon spotify" onClick={()=>{
          setWindowState(state=>({
            ...state, spotify:true,
          }))
        }}><img src="./Dock-icons/spotify.svg" alt="" /></div>
        <div className="icon mail"><img src="./Dock-icons/mail.svg" alt="" /></div>
        <div className="icon link"><img src="./Dock-icons/link.svg" alt="" /></div>
        <div className="icon cli" onClick={()=>{
          setWindowState(state=>({
            ...state, cli:true,
          }))
        }}><img src="./Dock-icons/cli.svg" alt="" /></div>
    </footer>
  )
}

export default Dock
