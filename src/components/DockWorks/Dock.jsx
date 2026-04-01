import "./dock.scss"

const Dock = () => {
  return (
    <footer className='Dock'>
        <div className="icon github"><img src="./Dock-icons/github.svg" alt="" /></div>
        <div className="icon note"><img src="./Dock-icons/note.svg" alt="" /></div>
        <div className="icon pdf"><img src="./Dock-icons/pdf.svg" alt="" /></div>
        <div className="icon calender"><img src="./Dock-icons/calender.svg" alt="" /></div>
        <div className="icon spotify"><img src="./Dock-icons/spotify.svg" alt="" /></div>
        <div className="icon mail"><img src="./Dock-icons/mail.svg" alt="" /></div>
        <div className="icon link"><img src="./Dock-icons/link.svg" alt="" /></div>
        <div className="icon cli"><img src="./Dock-icons/cli.svg" alt="" /></div>
    </footer>
  )
}

export default Dock
