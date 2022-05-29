import "./terms.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const Terms = () => {
	return (
		<>
			<Navbar />
			<main id="terms">
				<aside id="leftTerms">
					<h2>Terms</h2>
					<p>
						Before purchasing, please make sure you read everything
						written below. <br />
						<br /> We run a subscription based service for 3th party
						games. All steps in the guide must be followed, if you
						fail to follow a step we will not resupply you with a
						key, please make sure you take the time to read
						everything. We may resupply you a key on extreme
						conditions if used under 24 hours. <br />
						<br /> NO refunds will be given if a KEY IS USED and you
						fail to read everything, more personal problems will be
						dealt with and refunded if deemed necessary by us. If
						you have read everything and agree to it, you are free
						to buy.
						<br />
						<br />
						<span id="firstSpan">Discord:</span>
						<br />
						<span id="secondSpan">
							https://discord.gg/PH8wsZmcXj
						</span>
					</p>
				</aside>
				<aside id="rightTerms">
					<div id="termsIllustration"></div>
				</aside>
			</main>
			<Footer />
		</>
	);
};

export default Terms;
