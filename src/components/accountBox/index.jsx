import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { SignUpForm } from "./signupForm";
import { Link } from "react-router-dom";


const BoxContainer = styled.div`
	width: 320px;
	min-height: 550px;
	display: flex;
	flex-direction: column;
	border-radius: 19px;
	background-color: #fff;
	box-shadow: 0 0 8px rgba(15, 15, 15, 0.28);
	position: relative;
	overflow: hidden;
	left: 36vw;
    margin:10px ;
   
`;

const BackDrop = styled(motion.div)`
	width: 160%;
	height: 550px;
	position: absolute;
	display: flex;
	flex-direction: column;
	border-radius: 50%;
	transform: rotate(45deg);
	top: -290px;
	left: -70px;
	background: rgb(71, 70, 63);
	background: linear-gradient(
		58deg,
		rgb(71, 70, 63) 20%,
		rgba(243, 172, 18, 1) 100%
	);
`;

const TopContainer = styled.div`
	width: 100%;
	height: 250px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 0 1.8em;
	padding-bottom: 5em;
`;

const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const HeaderText = styled.h2`
	font-size: 30px;
	font-weight: 600;
	line-height: 1.24;
	color: #fff;
	z-index: 10;
	margin: 0;
	text-align: left;
`;
const HeaderLogo = styled.h1`
    font-size:40px ;
    position:absolute ;
    left:1em ;
    top:2% ;
    color: #000;

`;

const SmallText = styled.h5`
	color: #fff;
	font-weight: 500;
	font-size: 11px;
	z-index: 100;
	margin-top: 7px;
	text-align: left;
	margin: 0;
`;

const InnerContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0.8em;
`;

const backdropVariants = {
	expanded: {
		width: "233%",
		height: "1050px",
		borderRadius: "20%",
		transform: "rotate(60deg)",
	},
	collapsed: {
		width: "160%",
		height: "550px",
		borderRadius: "50%",
		transform: "rotate(60deg)",
	},
};

const expandedTransition = {
	type: "spring",
	duration: 2.3,
	stiffness: 30,
};

export function AccountBox(props) {
	const [isExpanded, setExpanded] = useState(false);
	const [active, setActive] = useState("signin");

	const playExpandedAnimation = () => {
		setExpanded(true);
		setTimeout(() => {
			setExpanded(false);
		}, expandedTransition.duration * 1000 - 1500);
	};
	const switchToSignUp = () => {
		playExpandedAnimation();
		setTimeout(() => {
			setActive("signup");
		}, 400);
	};

	const switchToSignin = () => {
		playExpandedAnimation();
		setTimeout(() => {
			setActive("signin");
		}, 400);
	};
	const contextValue = { switchToSignUp, switchToSignin };

	return (
		<AccountContext.Provider value={contextValue}> 
            <Link to="/"><HeaderLogo>RATIBA</HeaderLogo></Link>
			<BoxContainer>
				<TopContainer>
					{/* Render student */}
					<BackDrop
						initial={false}
						animate={isExpanded ? "expanded" : "collapsed"}
						variants={backdropVariants}
						transition={expandedTransition}
					/>
					{active === "signin" && (
						<HeaderContainer>
							<HeaderText>Welcome</HeaderText>
							<HeaderText>User</HeaderText>
							<SmallText>Please sign in to continue...</SmallText>
						</HeaderContainer>
					)}

					{/* Conditional rendering signup(admin) */}
					{active === "signup" && (
						<HeaderContainer>
							<HeaderText>Hello</HeaderText>
							<HeaderText>Admin</HeaderText>
							<SmallText>Please sign in to continue...</SmallText>
						</HeaderContainer>
					)}
				</TopContainer>
				<InnerContainer>
					{active === "signin" && <LoginForm />}
					{active === "signup" && <SignUpForm />}
				</InnerContainer>
			</BoxContainer>
		</AccountContext.Provider>
	);
}
