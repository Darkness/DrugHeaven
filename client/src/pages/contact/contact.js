import "./contact.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const Contact = () => {
	return(
	<>
		<Navbar />
		<main id="contact">
			<section>
				<aside id="leftContact">
					<h2>Contact</h2>
					<form action="" autoComplete="off">
						<aside id="leftForm">
							<div id="inputWrapper">
								<label htmlFor="">Title:</label>
								<input type="text" placeholder="Enter your title"/>
							</div>
							<div id="inputWrapper">
								<label htmlFor="">Email:</label>
								<input type="text" placeholder="Enter your email"/>
							</div>
							<div id="inputWrapper">
								<label htmlFor="">Discord:</label>
								<input type="text" placeholder="Enter your discord user info"/>
							</div>
						</aside>
						<aside id="rightForm">
							<div id="inputWrapper">
								<label htmlFor="">Message:</label>
								<textarea
									name=""
									id=""
									cols="30"
									rows="10"
									placeholder="Enter message"
								></textarea>
							</div>
						</aside>
					</form>
					<button type="submit">Send message</button>
				</aside>
				<aside id="rightContact">
					<div id="contactIllustration"></div>
				</aside>
			</section>
		</main>
		<Footer />
	</>)
};

export default Contact;
