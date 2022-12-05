import Carousel from "nuka-carousel";
import React, { useState } from 'react';
import {AdvancedImage as CloudinaryImg} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import styles from "./App.module.scss"
export type Locale = "en" | "tr" | "gr" | "ru";
export type AppLocale = {default: Locale, options: Locale[], current?: Locale}
export const APP_LOCALE: AppLocale = { default: "en", options: ["en", "tr", "gr", "ru"] }

function App() {
	// Language
	if (!APP_LOCALE.options.includes(APP_LOCALE.default)) throw new Error("Invalid default language configured...");
	const [appLocale, setAppLocale] = useState<typeof APP_LOCALE>(APP_LOCALE)
	const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
	//  CDN
	const [cloudName, cloudinaryTag] = ["tango-siempre", "Development"]
	const CDN = new Cloudinary({cloud: {cloudName}});

	return (
		<div>
			<Header {...{
				style: "header", 
				...(HEADER_PROPS[appLocale.current ?? appLocale.default]),
			}}>
				{(props) => <>
					<header>
						<article>
							<a href="/#">
								<CloudinaryImg cldImg={CDN.image(props.logo.src)} alt={props.logo.alt}></CloudinaryImg>
							</a>
						</article>
						<menu>
							<nav>
								{props.sections.map(s => <>
										<li>
											<a href={s.name.toLowerCase()}>{s.name}</a>
										</li>
									</>
								)}
							</nav>
							<section>
								<button onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}>
									≡
								</button>		
								<select 
									onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
										setAppLocale(l => ({...l, current: e.target.value as Locale}))
									}}
									name="locale" 
									value={appLocale.current} 
									required={true}
								>
									{Object.entries(appLocale.options).map(([key, value]) => <>
										<img src={value} alt={key}/>
										<option>
											{value}
										</option>
									</>)}				
								</select>
							</section>
						</menu>
					</header>
				</>}
			</Header>
			<Hero {...{
					style: "hero",
					...HERO_PROPS[appLocale.current ?? appLocale.default],
				}}>
				{(props) => <>
					<Carousel renderCenterLeftControls={() => null} renderCenterRightControls={() => null}>
						{props.images.map(img => <>
							<img src={img.src} alt={img.alt}></img>
						</>)}
					</Carousel>
			</>}
			</Hero>
			<Schedule {...{
				style: "schedule",
				...(SCHEDULE_PROPS[appLocale.current ?? appLocale.default])
			}}>
				{(props) =>  <>
					<section>
						<h2>{props.header.text} ({props.header.startDay} - {props.header.endDay} {props.header.month} {props.header.year})</h2>
						{
							props.agenda.map(event => <>
								<article>
									<div>
										<h2>
											{event.name}<span>{event.date}, {event.day}</span>
										</h2>
										{
											event.sessions.map(session => <>
												<p>
													<strong>{session.text}</strong><br/>{session.startTime} - {session.endTime}
												</p>
											
											</>)
										}
									</div>
								</article>
							</>)
						}
					</section>
				</>}
			</Schedule>
			<Accommodation {...{
				style: "accommodation",
				...(ACCOMMODATION_PROPS[appLocale.current ?? appLocale.default]),
			}}>
				{(props) => <>
					<section>
						<div id="accommodation">
							<div>
								<h1>{props.header.text}</h1>
								<div>
									<h2>{Array(props.introduction.starCount).fill(0).map(s => "☆")}</h2>
									<h2>{props.introduction.name}</h2>
									<h3>{props.introduction.description}</h3>
			
									{/* ACCOMMODATION GALLERY */}
									<section className="gallery">
										<div >
											{props.gallery.map(card => 
												<div >
													<a href={card.src}>
														{/* <CloudinaryImg cldImg={CDN.image(card.src)} alt={card.alt}/> */}
													</a>
												</div>
											)}
										</div>
									</section>
									{/* ACCOMMODATION DETAILS */}
									<div>
										<ul>
											<li>
												<>
													<strong>{props.details.header}</strong>
													{props.details.description}
													{props.details.body.map(card =>
														<li>
															{card.text}
														</li>	
													)}
												</>
											</li>
										</ul>
									</div>
									<div >
										<p>
											<strong> {props.details.checkInTime}</strong> 
										</p>
										<p>
											<strong>{props.details.checkInPrompt} {props.details.checkInPrompt}</strong>
											<strong>{props.details.checkOutPrompt}  {props.details.checkOutTime}</strong>
										</p>
										<div>
											<p>
												{props.address.callToAction}
												<a href={props.address.link.href} rel="noreferrer" target="_blank">{props.address.link.text}</a>
											</p>
											<iframe 
												title="Accommodation Location"
												src={props.address.googleMapsEmbedUrl}
												style={{border:0, width:"100%", height: "450px"}}
												allowFullScreen={false}
												loading="lazy">
											</iframe>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</>}
			</Accommodation>
			<Artist {...{
				style: "artist",
				...(ARTIST_PROPS[appLocale.current ?? appLocale.default])
			}}>
				{(props) => <>
					<section id="djteam">
						<div>
							<h1>{props.header}</h1>
							{props.cards.map(article => <>
								<div>
									{/* <CloudinaryImg cldImg={CDN.image(article.image.src)} alt={article.image.alt}/> */}
									<span><i>{article.header}</i></span>
								</div>
							</>)}
						</div>
					</section>
				</>}
			</Artist>
			<Price {...{
				style: "price",
				...(PRICE_PROPS[appLocale.current ?? appLocale.default])
			}}>
				{(props) =>  <>
					<div id="prices">
						<div>
							<h1>{props.header.main}</h1>
							<h2>{props.header.highlight}</h2>
							<br/>
							<br/>
							<h3>
								{props.header.note.body}
								<b>{props.header.note.important}</b>
							</h3>
							<br/>
							<br/>
						</div> 
						{props.cards.map(card =><>
							<div>
								<div>
									<img src={card.image.src} alt={card.image.src}/>
									<hr/>
									<strong>{card.roomType}</strong><br/>
									<strong>{card.visitDuration}</strong>{card.visitType}<br/>
									<strong>{card.visitMainAttraction}</strong>
									<hr/>
									<strong>{card.pricePer}{card.currency} {card.perPersonPrompt}</strong><br/>
									{card.text}
								</div>
							</div>
						</>)}
						<div>
							<p>{props.warning.header}:</p>
							<p>{props.warning.note.body.map(elem => <>
									<p>* {elem}</p>
									<br/>
								</>)}
							</p>
							<p><b>{props.warning.refundPolicy}</b></p>
						</div> 
					</div>
				</>}
			</Price>
			<Registrar {...{
				style: "registrar",
				...(REGISTRAR_PROPS[appLocale.current ?? appLocale.default])
			}}>
				{(props) => <>
				<div id="registration">
						<div className="container">
							<h1>{props.header}</h1>
							<form>
								{props.form.name}
								{props.form.children.map((c)=> <>
										<div>
											{c.prompt && c.prompt}
											{c.type === "select" 
												?   <select {...c}>
														{c.options?.map((o)=><>
															<option>{o}</option>
														</>)}
													</select>	
												: <input {...c} /> 
											}	
										</div>
									</>)}
							</form>
						</div>
					</div>
				</>}
			</Registrar>	
			<footer>
				<h1>© Tango Siempre</h1>
				<p>All rights reserved</p>
			</footer>
		</div>
  	);
}

export default App;

/////////////////////////////////////////////////////////////
// lib.ts
export type Localized<P> = { [key in Locale]: P}
export type Props<P>  = { children: ((props: (P & {style?:string})) => JSX.Element) } & P
export const Component = <P extends { children?: ((props: (P & { style?: string})) => JSX.Element) }> (props:P & { style?: string}): JSX.Element => {
	if(props.children){
		const grandChild: JSX.Element = props.children(props).props.children;
		return React.cloneElement(grandChild, { className: styles[String(props.style)] })
	}
	return <></>
} 

/////////////////////////////////////////////////////////////
// props.ts
export type HeaderProps = {logo:  { src?: string; alt?: string; }, sections:({ name: string; }[])}
export type HeroProps = { images: {src:string, alt: string}[], }
export type ScheduleProps = {
	header: { text: string, startDay: string, endDay: string, month: string, year: number }, 
	agenda: { name: string, date: string, day: string, sessions: { text: string, startTime: string, endTime: string }[], }[],
}
export type AccommodationProps = {
	header: {text: string}
	introduction: {starCount: number, name: string, description: string}
	gallery: {alt:string,src: string}[],
	details: {header: string, description: string, body:{text: string}[], checkInPrompt: string, checkOutPrompt: string, checkInTime: string, checkOutTime: string}
	address: {link : { text: string, href: string }, callToAction: string, googleMapsEmbedUrl: string}
}
export type ArtistProps = { header: string,  cards: {image: {src: string, alt: string}, header: string}[]}
export type PriceProps = {
	header: {
		main: string; highlight:string, note:{body: string, important: string}
	}
	cards: {
		perPersonPrompt: string;
		visitType: string; image: {src: string, alt: string}, roomType: string, visitDuration: number, visitMainAttraction: string, pricePer: number, currency: string, text: string 
	}[],
	warning: {	header: string,	note: { body: string[] }, refundPolicy: string, }
}
export type RegistrarProps = {
	form: {
		name: string, 
		children: { type: "text" | "select" | "submit" | "email" | "date" | "tel", options?: string[], prompt?:string, placeholder: string, required:boolean, fieldName: string, order:number, }[]
		}; header:string 
}

/////////////////////////////////////////////////////////////
// components.ts
export const Header = (props: (Props<HeaderProps>)) => Component<typeof props>(props)
export const Hero = (props: (Props<HeroProps>)) => Component<typeof props>(props)
export const Schedule = (props: (Props<ScheduleProps>)) => Component<typeof props>(props)
export const Accommodation = (props: (Props<AccommodationProps>)) => Component<typeof props>(props)
export const Artist = (props: (Props<ArtistProps>)) => Component<typeof props>(props)
export const Price = (props: (Props<PriceProps>)) => Component<typeof props>(props)
export const Registrar = (props: (Props<RegistrarProps>)) => Component<typeof props>(props)

/////////////////////////////////////////////////////////////
// data.ts
export const HEADER_PROPS: Localized<HeaderProps> = ({
	en:{
		logo: {src: "tango-siempre/siempre-logo", alt:"Siempre Logo"},
		sections: [
			{name: "Schedule" },
			{name: "Hotel" },
			{name: "DJs"},
			{name: "Price List"},
			{name: "Registration"},
		],
	},
	tr:{
		logo: {src: "tango-siempre/siempre-logo", alt:"Siempre Logo"},
		sections: [
			{name: "Program" },
			{name: "Hotel" },
			{name: "DJler"},
			{name: "Ucretler"},
			{name: "Kayit"},
		],
	},
	gr:{
		logo: {src: "tango-siempre/siempre-logo", alt:"Siempre λογότυπο"},
		sections: [
			{name: "πρόγραμμα" },
			{name: "ξενοδοχειο" },
			{name: "Λίστα DJ"},
			{name: "Λίστα τιμών"},
			{name: "Εγγραφή"},
		],
	},
	ru:{
		logo: {src: "tango-siempre/siempre-logo", alt:"Siempre логотип"},
		sections: [
			{name: "Программа" },
			{name: "Отель" },
			{name: "Список ди-джеев"},
			{name: "Прайс-лист"},
			{name: "Регистрация"},
		],
	},
} );

export const HERO_PROPS: Localized<HeroProps>  = ({
	en:{images: [
		{src:"", alt: ""},
		{src:"", alt: ""},
		{src:"", alt: ""},
		{src:"", alt: ""}
	]},
	tr:{images: [
		{src:"", alt: ""},
		{src:"", alt: ""},
		{src:"", alt: ""},
		{src:"", alt: ""}
	]},
	gr:{images: [
		{src:"", alt: ""},
		{src:"", alt: ""},
		{src:"", alt: ""},
		{src:"", alt: ""}
	]},
	ru:{images: [
		{src:"", alt: ""},
		{src:"", alt: ""},
		{src:"", alt: ""},
		{src:"", alt: ""}
	]},
} )

export const SCHEDULE_PROPS: Localized<ScheduleProps> = ({
	en:({
		header: { text:"Program", startDay: "24", endDay: "30", month: "May", year: 2022 },
		agenda: [
			{
				date:"24 May",
				day:"Wednesday", 
				name:"Day 1",
				sessions:[
					{endTime: "12.00",startTime: "9.00", text: "Opening Milonga",},
					{endTime: "16.00",startTime: "19.00", text: "Retro night Milonga",}
				],
			}
		]
	}),
	tr:({
		header: { text:"Program", startDay: "24", endDay: "30", month: "May", year: 2022 },
		agenda: [
			{
				date:"24 May",
				day:"Wednesday", 
				name:"Day 1",
				sessions:[
					{endTime: "12.00",startTime: "9.00", text: "Opening Milonga",},
					{endTime: "16.00",startTime: "19.00", text: "Retro night Milonga",}
				],
			}
		]
	}),
	gr:({
		header: { text:"Program", startDay: "24", endDay: "30", month: "May", year: 2022 },
		agenda: [
			{
				date:"24 May",
				day:"Wednesday", 
				name:"Day 1",
				sessions:[
					{endTime: "12.00",startTime: "9.00", text: "Opening Milonga",},
					{endTime: "16.00",startTime: "19.00", text: "Retro night Milonga",}
				],
			}
		]
	}),
	ru:({
		header: { text:"Program", startDay: "24", endDay: "30", month: "May", year: 2022 },
		agenda: [
			{
				date:"24 May",
				day:"Wednesday", 
				name:"Day 1",
				sessions:[
					{endTime: "12.00",startTime: "9.00", text: "Opening Milonga",},
					{endTime: "16.00",startTime: "19.00", text: "Retro night Milonga",}
				],
			}
		]
	}),
});
export const ACCOMMODATION_PROPS: Localized<AccommodationProps> = ({
	en:({
		header: {text: "ACCOMMODATION"},
		introduction: {
			starCount: 5,
			name: "Elite park resort hotel",
			description: "5 Star, All Inclusive"
		},
		gallery: [
			{src:"tango-siempre/OLV1", alt: ""},
			{src:"tango-siempre/OLV2", alt: ""},
			{src:"tango-siempre/OLV3", alt: ""},
			{src:"tango-siempre/OLV4", alt: ""},
			{src:"tango-siempre/OLV5", alt: ""},
			{src:"tango-siempre/OLV6", alt: ""},
			{src:"tango-siempre/OLV7", alt: ""},
			{src:"tango-siempre/OLV8", alt: ""},
		],
		details: {
			header: "ULTRA ALL-INCLUSIVE", 
			description: "(7/24 alcoholic and non-alcoholic drinks, open buffet breakfast, open buffet lunch and dinner, cakes and deserts. Free sandwiches, fruits and refreshments after Midnight at the milonga salon. ALL INCLUDED IN THE PRICE!)",
			body: [
				{text: "There will be transfer from the airport to the hotel and back with very afforable prices."},
				{text: "It is by the wonderful Mediterranean Sea and has many pools, a sport center and offers various activities."},
				{text: "The salon where we will hold our evening milongas is 1000 square meter with high ceiling!"}
			],
            checkInPrompt: "The check-in time is:",
            checkOutPrompt: "The check-out time is:",
			checkInTime: "14.00",
			checkOutTime: "12.00"
		},
		address: { 
			callToAction: "Click here to visit", 
			link: {href: "", text: "ELITE RESORT PARK"}, 
			googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.6681727219825!2d33.386754414950914!3d35.31422575761981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6b2bf1bca1a1%3A0xa3b20dbe0cf29a3b!2sThe%20Olive%20Tree%20Hotel!5e0!3m2!1sen!2s!4v1670088003960!5m2!1sen!2s",
		}
	} ),
	tr:({
		header: {text: "ACCOMMODATION"},
		introduction: {
			starCount: 5,
			name: "Elite park resort hotel",
			description: "5 Star, All Inclusive"
		},
		gallery: [
			{src:"tango-siempre/OLV1", alt: ""},
			{src:"tango-siempre/OLV2", alt: ""},
			{src:"tango-siempre/OLV3", alt: ""},
			{src:"tango-siempre/OLV4", alt: ""},
			{src:"tango-siempre/OLV5", alt: ""},
			{src:"tango-siempre/OLV6", alt: ""},
			{src:"tango-siempre/OLV7", alt: ""},
			{src:"tango-siempre/OLV8", alt: ""},
		],
		details: {
			header: "ULTRA ALL-INCLUSIVE", 
			description: "(7/24 alcoholic and non-alcoholic drinks, open buffet breakfast, open buffet lunch and dinner, cakes and deserts. Free sandwiches, fruits and refreshments after Midnight at the milonga salon. ALL INCLUDED IN THE PRICE!)",
			body: [
				{text: "There will be transfer from the airport to the hotel and back with very afforable prices."},
				{text: "It is by the wonderful Mediterranean Sea and has many pools, a sport center and offers various activities."},
				{text: "The salon where we will hold our evening milongas is 1000 square meter with high ceiling!"}
			],
            checkInPrompt: "The check-in time is:",
            checkOutPrompt: "The check-out time is:",
			checkInTime: "14.00",
			checkOutTime: "12.00"
		},
		address: { 
			callToAction: "Click here to visit", 
			link: {href: "", text: "ELITE RESORT PARK"}, 
			googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.6681727219825!2d33.386754414950914!3d35.31422575761981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6b2bf1bca1a1%3A0xa3b20dbe0cf29a3b!2sThe%20Olive%20Tree%20Hotel!5e0!3m2!1sen!2s!4v1670088003960!5m2!1sen!2s",
		}
	} ),
	gr:({
		header: {text: "ACCOMMODATION"},
		introduction: {
			starCount: 5,
			name: "Elite park resort hotel",
			description: "5 Star, All Inclusive"
		},
		gallery: [
			{src:"tango-siempre/OLV1", alt: ""},
			{src:"tango-siempre/OLV2", alt: ""},
			{src:"tango-siempre/OLV3", alt: ""},
			{src:"tango-siempre/OLV4", alt: ""},
			{src:"tango-siempre/OLV5", alt: ""},
			{src:"tango-siempre/OLV6", alt: ""},
			{src:"tango-siempre/OLV7", alt: ""},
			{src:"tango-siempre/OLV8", alt: ""},
		],
		details: {
			header: "ULTRA ALL-INCLUSIVE", 
			description: "(7/24 alcoholic and non-alcoholic drinks, open buffet breakfast, open buffet lunch and dinner, cakes and deserts. Free sandwiches, fruits and refreshments after Midnight at the milonga salon. ALL INCLUDED IN THE PRICE!)",
			body: [
				{text: "There will be transfer from the airport to the hotel and back with very afforable prices."},
				{text: "It is by the wonderful Mediterranean Sea and has many pools, a sport center and offers various activities."},
				{text: "The salon where we will hold our evening milongas is 1000 square meter with high ceiling!"}
			],
            checkInPrompt: "The check-in time is:",
            checkOutPrompt: "The check-out time is:",
			checkInTime: "14.00",
			checkOutTime: "12.00"
		},
		address: { 
			callToAction: "Click here to visit", 
			link: {href: "", text: "ELITE RESORT PARK"}, 
			googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.6681727219825!2d33.386754414950914!3d35.31422575761981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6b2bf1bca1a1%3A0xa3b20dbe0cf29a3b!2sThe%20Olive%20Tree%20Hotel!5e0!3m2!1sen!2s!4v1670088003960!5m2!1sen!2s",
		}
	} ),
	ru:({
		header: {text: "ACCOMMODATION"},
		introduction: {
			starCount: 5,
			name: "Elite park resort hotel",
			description: "5 Star, All Inclusive"
		},
		gallery: [
			{src:"tango-siempre/OLV1", alt: ""},
			{src:"tango-siempre/OLV2", alt: ""},
			{src:"tango-siempre/OLV3", alt: ""},
			{src:"tango-siempre/OLV4", alt: ""},
			{src:"tango-siempre/OLV5", alt: ""},
			{src:"tango-siempre/OLV6", alt: ""},
			{src:"tango-siempre/OLV7", alt: ""},
			{src:"tango-siempre/OLV8", alt: ""},
		],
		details: {
			header: "ULTRA ALL-INCLUSIVE", 
			description: "(7/24 alcoholic and non-alcoholic drinks, open buffet breakfast, open buffet lunch and dinner, cakes and deserts. Free sandwiches, fruits and refreshments after Midnight at the milonga salon. ALL INCLUDED IN THE PRICE!)",
			body: [
				{text: "There will be transfer from the airport to the hotel and back with very afforable prices."},
				{text: "It is by the wonderful Mediterranean Sea and has many pools, a sport center and offers various activities."},
				{text: "The salon where we will hold our evening milongas is 1000 square meter with high ceiling!"}
			],
            checkInPrompt: "The check-in time is:",
            checkOutPrompt: "The check-out time is:",
			checkInTime: "14.00",
			checkOutTime: "12.00"
		},
		address: { 
			callToAction: "Click here to visit", 
			link: {href: "", text: "ELITE RESORT PARK"}, 
			googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.6681727219825!2d33.386754414950914!3d35.31422575761981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6b2bf1bca1a1%3A0xa3b20dbe0cf29a3b!2sThe%20Olive%20Tree%20Hotel!5e0!3m2!1sen!2s!4v1670088003960!5m2!1sen!2s",
			}
	} ),
});
export const ARTIST_PROPS: Localized<ArtistProps> = ({
	en:(({
		header: "DJs",
		cards: [
			{header:"DJ Engin Arca", image: {alt:"", src:"tango-siempre/engin"}},
			{header:"DJ Rash", image: {alt:"", src:"tango-siempre/rash"}},
			{header:"DJ Yasemin ", image: {alt:"", src:"tango-siempre/yasemin"}},
		],
	})),
	tr:(({
		header: "DJler",
		cards: [
			{header:"DJ Engin Arca", image: {alt:"", src:"tango-siempre/engin"}},
			{header:"DJ Rash", image: {alt:"", src:"tango-siempre/rash"}},
			{header:"DJ Yasemin", image: {alt:"", src:"tango-siempre/yasemin"}},
		],
	} )),
	gr:(({
		header: "DJs",
		cards: [
			{header:"DJ Engin Arca", image: {alt:"", src:"tango-siempre/engin"}},
			{header:"DJ Rash", image: {alt:"", src:"tango-siempre/rash"}},
			{header:"DJ Yasemin ", image: {alt:"", src:"tango-siempre/yasemin"}},
		],
	} )),
	ru:(({
		header: "DJs",
		cards: [
			{header:"DJ Engin Arca", image: {alt:"", src:"tango-siempre/engin"}},
			{header:"DJ Rash", image: {alt:"", src:"tango-siempre/rash"}},
			{header:"DJ Yasemin ", image: {alt:"", src:"tango-siempre/yasemin"}},
		],
	} ))
});
export const PRICE_PROPS: Localized<PriceProps> = ({
	en:(({
		header: {
            main: "PRICES",
			highlight: "WE FILLED FIRST 150 ROOMS! NEW PRICES ARE STILL DISCOUNTED UNTIL 200 ROOMS. DON'T MISS IT!",
			note:{
				body: "Dear all, we opened registration on August 15th and filled more than 150 rooms as of August 19th!  Thank you so much for your interest for Caliente. The prices increased little bit but these new prices are valid for the next 50 rooms. After we fill 200 rooms total, the hotel prices will increase again and we might be sold out soon!  Please register before it is too late.",
				important: "(as of January 1st 2020, we only have 45 rooms left. 155 rooms are filled!)",
			}
		},
		cards: [
			{ 
				image: {
					src: "", 
					alt: ""
				}, 
				roomType: "Double room", 
				visitDuration: 5,
                visitType: "nights of stay",
				pricePer: 50,
                perPersonPrompt: "Per Person",
				currency: "euros",
                visitMainAttraction: "All Milongas",
				text: "(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again.)", 
				},
			{
				image: {
					src: "", 
					alt: ""
				},
				roomType: "Double room",
				visitDuration: 4, 
                visitType: "nights of stay",
				currency: "euros",
				pricePer: 100,
                perPersonPrompt: "Per Person",
				visitMainAttraction: "All Milongas",
				text:"(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again."
			},
			{
				image: {
					src: "", 
					alt: ""
				},
				roomType: "Single room",
				visitDuration: 6, 
                visitType: "nights of stay",
				currency: "euros",
				pricePer: 740,
                perPersonPrompt: "Per Person",
				visitMainAttraction: "All Milongas",
				text:"(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again."
			},
		],
		warning: {
			header:"Please Note", 
			note:{
				body: [
					"The prices include everything: the marathon and the hotel.(7/24 alcoholic and non-alcoholic drinks, open buffet breakfast, open buffet lunch and open buffet dinner, cakes and deserts. Free sandwiches, fruits and refreshments during milongas. ALL INCLUDED IN THE PRICE!)",
					"We only ask you to pay 100 euros as deposit with your credit card. You will be paying the remaining balance to us when you come to the hotel.Details will be in the reply to your registration.",
					"You can book this hotel with a tour if you like. In that case, you can only pay for the milongas which would be 150 euros.",
					"No single or two nights acceptance. We have limited number of rooms for 3 nights and limited number of single rooms.",
					"Full refund before January 1st 2023. For cancelations between January 1th and April 1st, 50 euro of your deposit is refunded to you. Refunds will be made after the event in June 2023.",
					"Daily acceptance to the milongas from outside is unfortunately not possible due to the hotel regulations",
					"1st child younger than 11 years old is free of charge. 2nd child younger than 11 years old is %50 off",
					"You will be informed about the payment methods in your registration confirmation email later",
					"If you would like to extend your stay, you can check-in earlier or/and check-out later. The price is 85 euros per person/day in a double, 130 euros in a single room until September 1st. All inclusive.",
					"Please write this specifically in the notes section in the registration form.",
				], 
			}, 
			refundPolicy: "No refunds after April 1st."}
		
	} )),
	tr:(({
		header: {
            main: "PRICES",

			highlight: "WE FILLED FIRST 150 ROOMS! NEW PRICES ARE STILL DISCOUNTED UNTIL 200 ROOMS. DON'T MISS IT!",
			note:{
				body: "Dear all, we opened registration on August 15th and filled more than 150 rooms as of August 19th!  Thank you so much for your interest for Caliente. The prices increased little bit but these new prices are valid for the next 50 rooms. After we fill 200 rooms total, the hotel prices will increase again and we might be sold out soon!  Please register before it is too late.",
				important: "(as of January 1st 2020, we only have 45 rooms left. 155 rooms are filled!)",
			}
		},
		cards: [
			{ 
				image: {
					src: "", 
					alt: ""
				}, 
				roomType: "Double room", 
				visitDuration: 5,                visitType: "nights of stay",

				pricePer: 50,
                perPersonPrompt: "Per Person",
				currency: "euros",
                visitMainAttraction: "All Milongas",
				text: "(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again.)", 
				},
			{
				image: {
					src: "", 
					alt: ""
				},
				roomType: "Double room",
				visitDuration: 4,                 visitType: "nights of stay",

				currency: "euros",
				pricePer: 100,
                perPersonPrompt: "Per Person",
				visitMainAttraction: "All Milongas",
				text:"(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again."
			},
			{
				image: {
					src: "", 
					alt: ""
				},
				roomType: "Single room",
				visitDuration: 6,                 visitType: "nights of stay",

				currency: "euros",
				pricePer: 740,
                perPersonPrompt: "Per Person",
				visitMainAttraction: "All Milongas",
				text:"(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again."
			},
		],
		warning: {
			header:"Please Note", 
			note:{
				body: [
					"The prices include everything: the marathon and the hotel.(7/24 alcoholic and non-alcoholic drinks, open buffet breakfast, open buffet lunch and open buffet dinner, cakes and deserts. Free sandwiches, fruits and refreshments during milongas. ALL INCLUDED IN THE PRICE!)",
					"We only ask you to pay 100 euros as deposit with your credit card. You will be paying the remaining balance to us when you come to the hotel.Details will be in the reply to your registration.",
					"You can book this hotel with a tour if you like. In that case, you can only pay for the milongas which would be 150 euros.",
					"No single or two nights acceptance. We have limited number of rooms for 3 nights and limited number of single rooms.",
					"Full refund before January 1st 2023. For cancelations between January 1th and April 1st, 50 euro of your deposit is refunded to you. Refunds will be made after the event in June 2023.",
					"Daily acceptance to the milongas from outside is unfortunately not possible due to the hotel regulations",
					"1st child younger than 11 years old is free of charge. 2nd child younger than 11 years old is %50 off",
					"You will be informed about the payment methods in your registration confirmation email later",
					"If you would like to extend your stay, you can check-in earlier or/and check-out later. The price is 85 euros per person/day in a double, 130 euros in a single room until September 1st. All inclusive.",
					"Please write this specifically in the notes section in the registration form.",
				], 
			}, 
			refundPolicy: "No refunds after April 1st."}
		
	} )),
	gr:(({
		header: {
            main: "PRICES",

			highlight: "WE FILLED FIRST 150 ROOMS! NEW PRICES ARE STILL DISCOUNTED UNTIL 200 ROOMS. DON'T MISS IT!",
			note:{
				body: "Dear all, we opened registration on August 15th and filled more than 150 rooms as of August 19th!  Thank you so much for your interest for Caliente. The prices increased little bit but these new prices are valid for the next 50 rooms. After we fill 200 rooms total, the hotel prices will increase again and we might be sold out soon!  Please register before it is too late.",
				important: "(as of January 1st 2020, we only have 45 rooms left. 155 rooms are filled!)",
			}
		},
		cards: [
			{ 
				image: {
					src: "", 
					alt: ""
				}, 
				roomType: "Double room", 
				visitDuration: 5,                
                visitType: "nights of stay",
				pricePer: 50,
                perPersonPrompt: "Per Person",
				currency: "euros",
                visitMainAttraction: "All Milongas",
				text: "(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again.)", 
				},
			{
				image: {
					src: "", 
					alt: ""
				},
				roomType: "Double room",
				visitDuration: 4,                 
                visitType: "nights of stay",
				currency: "euros",
				pricePer: 100,
                perPersonPrompt: "Per Person",
				visitMainAttraction: "All Milongas",
				text:"(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again."
			},
			{
				image: {
					src: "", 
					alt: ""
				},
				roomType: "Single room",
				visitDuration: 6,                 
                visitType: "nights of stay",
				currency: "euros",
                perPersonPrompt: "Per Person",
				pricePer: 740,
				visitMainAttraction: "All Milongas",
				text:"(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again."
			},
		],
		warning: {
			header:"Please Note", 
			note:{
				body: [
					"The prices include everything: the marathon and the hotel.(7/24 alcoholic and non-alcoholic drinks, open buffet breakfast, open buffet lunch and open buffet dinner, cakes and deserts. Free sandwiches, fruits and refreshments during milongas. ALL INCLUDED IN THE PRICE!)",
					"We only ask you to pay 100 euros as deposit with your credit card. You will be paying the remaining balance to us when you come to the hotel.Details will be in the reply to your registration.",
					"You can book this hotel with a tour if you like. In that case, you can only pay for the milongas which would be 150 euros.",
					"No single or two nights acceptance. We have limited number of rooms for 3 nights and limited number of single rooms.",
					"Full refund before January 1st 2023. For cancelations between January 1th and April 1st, 50 euro of your deposit is refunded to you. Refunds will be made after the event in June 2023.",
					"Daily acceptance to the milongas from outside is unfortunately not possible due to the hotel regulations",
					"1st child younger than 11 years old is free of charge. 2nd child younger than 11 years old is %50 off",
					"You will be informed about the payment methods in your registration confirmation email later",
					"If you would like to extend your stay, you can check-in earlier or/and check-out later. The price is 85 euros per person/day in a double, 130 euros in a single room until September 1st. All inclusive.",
					"Please write this specifically in the notes section in the registration form.",
				], 
			}, 
			refundPolicy: "No refunds after April 1st."}
		
	} )),
	ru:(({
		header: {
            main: "PRICES",

			highlight: "WE FILLED FIRST 150 ROOMS! NEW PRICES ARE STILL DISCOUNTED UNTIL 200 ROOMS. DON'T MISS IT!",
			note:{
				body: "Dear all, we opened registration on August 15th and filled more than 150 rooms as of August 19th!  Thank you so much for your interest for Caliente. The prices increased little bit but these new prices are valid for the next 50 rooms. After we fill 200 rooms total, the hotel prices will increase again and we might be sold out soon!  Please register before it is too late.",
				important: "(as of January 1st 2020, we only have 45 rooms left. 155 rooms are filled!)",
			}
		},
		cards: [
			{ 
				image: {
					src: "", 
					alt: ""
				}, 
				roomType: "Double room", 
				visitDuration: 5,                
                visitType: "nights of stay",
				pricePer: 50,
				currency: "euros",
                perPersonPrompt: "Per Person",
                visitMainAttraction: "All Milongas",
				text: "(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again.)", 
				},
			{
				image: {
					src: "", 
					alt: ""
				},
				roomType: "Double room",
				visitDuration: 4,                 
                visitType: "nights of stay",
				currency: "euros",
				pricePer: 100,
                perPersonPrompt: "Per Person",
				visitMainAttraction: "All Milongas",
				text:"(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again."
			},
			{
				image: {
					src: "", 
					alt: ""
				},
				roomType: "Single room",
				visitDuration: 6,                 
                visitType: "nights of stay",
				currency: "euros",
				pricePer: 740,
                perPersonPrompt: "Per Person",
				visitMainAttraction: "All Milongas",
				text:"(We filled first 150 rooms! The new prices are for the next 50 rooms. Then it will increase again."
			},
		],
		warning: {
			header:"Please Note", 
			note:{
				body: [
					"The prices include everything: the marathon and the hotel.(7/24 alcoholic and non-alcoholic drinks, open buffet breakfast, open buffet lunch and open buffet dinner, cakes and deserts. Free sandwiches, fruits and refreshments during milongas. ALL INCLUDED IN THE PRICE!)",
					"We only ask you to pay 100 euros as deposit with your credit card. You will be paying the remaining balance to us when you come to the hotel.Details will be in the reply to your registration.",
					"You can book this hotel with a tour if you like. In that case, you can only pay for the milongas which would be 150 euros.",
					"No single or two nights acceptance. We have limited number of rooms for 3 nights and limited number of single rooms.",
					"Full refund before January 1st 2023. For cancelations between January 1th and April 1st, 50 euro of your deposit is refunded to you. Refunds will be made after the event in June 2023.",
					"Daily acceptance to the milongas from outside is unfortunately not possible due to the hotel regulations",
					"1st child younger than 11 years old is free of charge. 2nd child younger than 11 years old is %50 off",
					"You will be informed about the payment methods in your registration confirmation email later",
					"If you would like to extend your stay, you can check-in earlier or/and check-out later. The price is 85 euros per person/day in a double, 130 euros in a single room until September 1st. All inclusive.",
					"Please write this specifically in the notes section in the registration form.",
				], 
			}, 
			refundPolicy: "No refunds after April 1st."}
		
	} ))
});
export const REGISTRAR_PROPS: Localized<RegistrarProps> = ({
	
	en:({
        header: "Please register to the event by filling in the following form:",
		form: { 
			name: "Registration",
			children: [
				{type: "text", placeholder: "Name", required:true, fieldName: "name", order:1, },
				{ type: "text", placeholder: "Surname", required:true,  fieldName: "surname", order:2,  },
				{ type: "email", placeholder: "Email", required:true,  fieldName: "email", order:3, },
				{ type: "tel", placeholder: "Phone Number", required:true, fieldName: "phone", order:4, },
				{ type: "date", placeholder: "Checkin Date", required:true, prompt: "Check-in Date", fieldName: "checkin",order:5,  },
				{ type: "date", placeholder: "Checkout Date", required:true, prompt: "Check-out Date", fieldName: "checkout", order:6, },
				{ type: "select", placeholder: "Package", required:true, prompt: "Please Choose a:",  fieldName: "package",  options: ["6 nights in a double room + All Milongas: 550 euros/person"], order:7,},
				{ type: "select", placeholder: "Dancing Style", required:true, prompt: "I take on the role of a:",  fieldName:"dancing-style", options: ["Follower", "Leader"], order:8,},
				{ type: "select", placeholder: "Years of Experience", required:true, prompt: "I've been a dancer for:", fieldName: "years-of-experience",  options: ["less than a year","1-2 years","2-3 years","3-5 years", "more than 5 years"], order:9,},
				{ type: "text", placeholder: "Country", required:true, fieldName: "country", order:10, },
				{ type: "text", placeholder: "City", required:true, fieldName: "city", order:11, },
				{ type: "text", placeholder: "+1 Guest Full Name", required:true, fieldName: "guest", order:12, },
				{ type: "text", placeholder: "Facebook Profile", required:false, prompt: "Your Facebook profile", fieldName: "facebook", order:13, },
				{ type: "text", placeholder: "I am allergic to seafood...", required:false, prompt: "Additional Notes", fieldName: "notes", order:14, },
		]}
	}),
	tr:({
        header: "Please register to the event by filling in the following form:",
		form: { 
			name: "Registration",
			children: [
				{type: "text", placeholder: "Name", required:true, fieldName: "name", order:1, },
				{ type: "text", placeholder: "Surname", required:true,  fieldName: "surname", order:2,  },
				{ type: "email", placeholder: "Email", required:true,  fieldName: "email", order:3, },
				{ type: "tel", placeholder: "Phone Number", required:true, fieldName: "phone", order:4, },
				{ type: "date", placeholder: "Checkin Date", required:true, prompt: "Check-in Date", fieldName: "checkin",order:5,  },
				{ type: "date", placeholder: "Checkout Date", required:true, prompt: "Check-out Date", fieldName: "checkout", order:6, },
				{ type: "select", placeholder: "Package", required:true, prompt: "Please Choose a Package:",  fieldName: "package",  options: ["6 nights in a double room + All Milongas: 550 euros/person"], order:7,},
				{ type: "select", placeholder: "Dancing Style", required:true, prompt: "I take on the role of a:",  fieldName:"dancing-style", options: ["Follower", "Leader"], order:8,},
				{ type: "select", placeholder: "Years of Experience", required:true, prompt: "I've been a dancer for:", fieldName: "years-of-experience",  options: ["less than a year","1-2 years","2-3 years","3-5 years", "more than 5 years"], order:9,},
				{ type: "text", placeholder: "Country", required:true, fieldName: "country", order:10, },
				{ type: "text", placeholder: "City", required:true, fieldName: "city", order:11, },
				{ type: "text", placeholder: "+1 Guest Full Name", required:true, fieldName: "guest", order:12, },
				{ type: "text", placeholder: "Facebook Profile", required:false, prompt: "Your Facebook profile", fieldName: "facebook", order:13, },
				{ type: "text", placeholder: "I am allergic to seafood...", required:false, prompt: "Additional Notes", fieldName: "notes", order:14, },
		]}
	}),
	gr:({
        header: "Παρακαλούμε εγγραφείτε στην εκδήλωση συμπληρώνοντας την παρακάτω φόρμα:",
		form: { 
			name: "Εγγραφή",
			children: [
				{type: "text", placeholder: "όνομα", required:true, fieldName: "name", order:1, },
				{ type: "text", placeholder: "επώνυμο", required:true,  fieldName: "surname", order:2,  },
				{ type: "email", placeholder: "ΗΛΕΚΤΡΟΝΙΚΗ ΔΙΕΥΘΥΝΣΗ", required:true,  fieldName: "email", order:3, },
				{ type: "tel", placeholder: "τηλεφωνικό νούμερο", required:true, fieldName: "phone", order:4, },
				{ type: "date", placeholder: "Ημερομηνία άφιξης", required:true, prompt: "Ημερομηνία άφιξης:", fieldName: "checkin",order:5,  },
				{ type: "date", placeholder: "Ημερομηνία αναχώρησης", required:true, prompt: "Ημερομηνία αναχώρησης", fieldName: "checkout", order:6, },
				{ type: "select", placeholder: "Τύπος Πακέτου", required:true, prompt: "Επιλέξτε ένα πακέτο:",  fieldName: "package",  options: ["6 διανυκτερεύσεις σε δίκλινο δωμάτιο + Όλα Milongas: 550 ευρώ/άτομο"], order:7,},
				{ type: "select", placeholder: "Χορευτικό Στυλ", required:true, prompt: "αναλαμβάνω το ρόλο του α:",  fieldName:"dancing-style", options: ["Οπαδός", "Ηγέτης"], order:8,},
				{ type: "select", placeholder: "Χορευτικά Χρόνια", required:true, prompt: "Έχω υπάρξει χορεύτρια για:", fieldName: "years-of-experience",  options: ["λιγότερο από ένα χρόνο","1-2 χρόνια","2-3 χρόνια","3-5 χρόνια", "περισσότερο από 5 χρόνια"], order:9,},
				{ type: "text", placeholder: "Χώρα", required:true, fieldName: "country", order:10, },
				{ type: "text", placeholder: "Πόλη", required:true, fieldName: "city", order:11, },
				{ type: "text", placeholder: "+1 Επισκέπτης Πλήρες Όνομα", required:false, fieldName: "guest", order:12, },
				{ type: "text", placeholder: "Προφίλ Facebook", required:false, prompt: "Your Facebook profile", fieldName: "facebook", order:13, },
				{ type: "text", placeholder: "Είμαι αλλεργικός στα θαλασσινά...", required:false, prompt: "επιπρόσθετες σημειώσεις", fieldName: "notes", order:14, },
		]}
	} ),
	ru:({
        header: "Please register to the event by filling in the following form:",
		form: { 
			name: "Registration",
			children: [
				{type: "text", placeholder: "Name", required:true, fieldName: "name", order:1, },
				{ type: "text", placeholder: "Surname", required:true,  fieldName: "surname", order:2,  },
				{ type: "email", placeholder: "Email", required:true,  fieldName: "email", order:3, },
				{ type: "tel", placeholder: "Phone Number", required:true, fieldName: "phone", order:4, },
				{ type: "date", placeholder: "Checkin Date", required:true, prompt: "Check-in Date", fieldName: "checkin",order:5,  },
				{ type: "date", placeholder: "Checkout Date", required:true, prompt: "Check-out Date", fieldName: "checkout", order:6, },
				{ type: "select", placeholder: "Package", required:true, prompt: "Please Choose a:",  fieldName: "package",  options: ["6 nights in a double room + All Milongas: 550 euros/person"], order:7,},
				{ type: "select", placeholder: "Dancing Style", required:true, prompt: "I take on the role of a:",  fieldName:"dancing-style", options: ["Follower", "Leader"], order:8,},
				{ type: "select", placeholder: "Years of Experience", required:true, prompt: "I've been a dancer for:", fieldName: "years-of-experience",  options: ["less than a year","1-2 years","2-3 years","3-5 years", "more than 5 years"], order:9,},
				{ type: "text", placeholder: "Country", required:true, fieldName: "country", order:10, },
				{ type: "text", placeholder: "City", required:true, fieldName: "city", order:11, },
				{ type: "text", placeholder: "+1 Guest Full Name", required:true, fieldName: "guest", order:12, },
				{ type: "text", placeholder: "Facebook Profile", required:false, prompt: "Your Facebook profile", fieldName: "facebook", order:13, },
				{ type: "text", placeholder: "I am allergic to seafood...", required:false, prompt: "Additional Notes", fieldName: "notes", order:14, },
		]}
	} )
});


