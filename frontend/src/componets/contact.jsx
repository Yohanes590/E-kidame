import '../styles/contact.css'
function Contact_page(){
    return(<>
    
    <div className="contact-page">

<h2>Contact Us</h2>

<div className="input-contact">
    <input type="text" placeholder='Name' /><br/>
    <input type="text" placeholder='Email' /><br/>
    <textarea name="" id="" placeholder='Your Message Here!'></textarea><br/>
    <button id="order">Send</button>

        <div className="contact-information">
        <br/><p>Phone No: +251962579755</p>
        <p>jplussince34@gmail.com</p>
        </div>

</div>

</div>
    </>)
}

export default Contact_page