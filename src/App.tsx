import "./App.scss"
import Carousel from "nuka-carousel";
import React, { useState } from 'react';
import {AdvancedImage as CloudinaryImg} from '@cloudinary/react';
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { RoundCorners } from "@cloudinary/transformation-builder-sdk/actions/roundCorners";
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
				...(HEADER_PROPS[appLocale.current ?? appLocale.default]),
			}}>
				{(props) => <>
					<header className="header">
						<article className="header__article">
							<a className="article__a" href="/#">
								<CloudinaryImg className="a__logo" cldImg={CDN.image(props.logo.src)} alt={props.logo.alt}></CloudinaryImg>
							</a>
						</article>
						<menu className="header__menu">
							<nav className="menu__nav" role="navigation">
								<ul className={`nav__ul ${isMenuCollapsed ? "nav__ul--collapsed" : "" }`}>
									{props.sections.map(s => <>
											<li className="ul__li">
												<a className="li__a" href={s.name.toLowerCase()}>{s.name}</a>
											</li>
									</> 
									)}
								</ul>
							</nav>
							<section className="menu__section">
								<button className="section__button" onClick={() => setIsMenuCollapsed(s =>!s)} aria-expanded={!isMenuCollapsed} aria-controls="nav__ul">
									≡
								</button>	
								<select className="section__select"
									onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
										setAppLocale(l => ({...l, current: e.target.value as Locale}))
									}}
									name="locale" 
									value={appLocale.current} 
									required={true}
								>
									{Object.entries(appLocale.options).map(([key, value]) => <>
										<img className="select__img" src={value} alt={key}/>
										<option className="select__option">
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
					// style: "hero",
					...HERO_PROPS[appLocale.current ?? appLocale.default],
				}}>
				{(props) => <>
					<Carousel className="hero" renderCenterLeftControls={() => null} renderCenterRightControls={() => null}>
						{props.images.map(img => <>
							<img src={img.src} alt={img.alt}></img>
						</>)}
					</Carousel>
			</>}
			</Hero>
			<Schedule {...{
				// style: "schedule",
				...(SCHEDULE_PROPS[appLocale.current ?? appLocale.default])
			}}>
				{(props) =>  <>
					<section className="schedule">
						<h2 className="schedule__header">{props.header.text} ({props.header.startDay} - {props.header.endDay} {props.header.month} {props.header.year})</h2>
						{
							props.agenda.map(event => <>
								<article className="schedule__article">
									<h2 className="article__header">
										{event.name}<span>{event.date}, {event.day}</span>
									</h2>
									{
										event.sessions.map((session,i) => 
											<p className="article__p" key={i}>
												<strong>{session.text}</strong><br/>{session.startTime} - {session.endTime}
											</p>
										)
									}
								</article>
							</>)
						}
					</section>
				</>}
			</Schedule>
			<Accommodation {...{
				// style: "accommodation",
				...(ACCOMMODATION_PROPS[appLocale.current ?? appLocale.default]),
			}}>
				{(props) => <>
					<section className="accommodation">
						<h1 className="accommodation__h">{props.header.text}</h1>
						<article className="accommodation__article">
							<header className="article__header">
								{props.introduction.starCount && <h2 className="header__h">{ Array(props.introduction.starCount).fill(0).map(s => "☆")}</h2>}
								<h2 className="header__h">{props.introduction.name}</h2>
								<h3 className="header__h">{props.introduction.description}</h3>
							</header>
							<main className="article__main">
								{/* ACCOMMODATION GALLERY */}
								<section className="main__section">
									{props.gallery.map(card => 
										<address className="section__address">
											<a className="address__a" href={props.address.link.href} rel="noreferrer" target="_blank">
												<CloudinaryImg className="a__img" cldImg={CDN.image(card.src).resize(scale("315"))}/>
											</a>
										</address>
									)}
								</section>
								{/* ACCOMMODATION DETAILS */}
								<section className="main__section">
									<ul className="section__ul">
										<li className="ul__li">
											<header className="li__header">
												<p className="li__p"><strong>{props.details.header}</strong></p>
												<p className="li__p">{props.details.description}</p>
											</header>
											<main className="li__main">
												{props.details.body.map(card =>
													<p className="main__p">
														{card.text}
													</p>	
												)}
											</main>
										</li>
									</ul>
								</section>
							</main>
							<footer className="article__footer">
								<header className="footer__header">
									<p className="header__p">
										<strong>{props.details.checkInPrompt} {props.details.checkInTime}</strong>
										<strong>{props.details.checkOutPrompt}  {props.details.checkOutTime}</strong>
									</p>
								</header>
								<main className="footer__main">
									<address className="main__address">
										<p className="address__p">{props.address.callToAction}</p>
										<a  className="address__a" href={props.address.link.href} rel="noreferrer" target="_blank">{props.address.link.text}</a>
									</address>
									<iframe  className="main__iframe"
										title="Accommodation Location"
										src={props.address.googleMapsEmbedUrl}
										style={{border:0, width:"100%", height: "450px"}}
										allowFullScreen={false}
										loading="lazy">
									</iframe>
								</main>
							</footer>
						</article>
					</section>
				</>}
			</Accommodation>
			<Artist {...{
				...(ARTIST_PROPS[appLocale.current ?? appLocale.default])
			}}>
				{(props) => <>
					<section className="artist">
						<article className="artist__article">
							<h1 className="article__h">{props.header}</h1>
							{props.cards.map(article => (
								<div className="article__element">
									<CloudinaryImg className="element__img" cldImg={CDN.image(article.image.src).resize(scale("315"))}/>
									<span className="element__title"><i>{article.header}</i></span>
								</div>
							))}
						</article>
					</section>
				</>}
			</Artist>
			<Price {...{
				// style: "price",
				...(PRICE_PROPS[appLocale.current ?? appLocale.default])
			}}>
				{(props) =>  <>
					<section className="price">
						<header className="price__header">
							<h1 className="header__h">{props.header.main}</h1>
							<h3 className="header__h">{props.header.highlight}</h3>
							{props.header.note.body && <p className="header__p">{props.header.note.body}</p>}
							{props.header.note.important && <p className="header__p"><b>{props.header.note.important}</b></p>}
						</header> 
						<main className="price__main">
							{props.cards.map((card,i) =>(
								<article className="main__article" key={i}>
									<img className="article__img" src={card.image.src} alt={card.image.src}/>
									<hr className="article__hr"/>
									<p className="article__p">{card.roomType}</p>
									<p className="article__p">{card.visitDuration} {card.visitType}</p>
									<p className="article__p">{card.visitMainAttraction}</p>
									<hr className="article__hr"/>
									<p className="article__p"><b>{card.pricePer} {card.currency}</b> {card.perPersonPrompt}</p>
									<p className="article__p">{card.text}</p>
								</article>
							))}
						</main>
						{props.warning && <footer className="price__footer">
							<p className="footer__p">{props.warning.header}:</p>
							<p className="footer__p">{props.warning.note.body.map(elem => `* ${elem}`)}</p>
							<p className="footer__p"><b>{props.warning.refundPolicy}</b></p>
						</footer>} 
					</section>
				</>}
			</Price>
			<Registrar {...{
				// style: "registrar",
				...(REGISTRAR_PROPS[appLocale.current ?? appLocale.default])
			}}>
				{(props) => <>
				<section className="registrar">
					<article className="registrar__article">
						<h1 className="article__h1">{props.header}</h1>
						<form className="article__form">
							<h3 className="form__header">{props.form.name}</h3>
							{props.form.children.map((c)=> <>
								<div className="form__element">
									{c.prompt && <p className="element__p">{c.prompt}</p>}
									{c.type === "select" 
										?   <select {...c} className="element__select">
												{c.options?.map((o)=><>
													<option>{o}</option>
												</>)}
											</select>	
										: <input {...c} /> 
									}	
								</div>
							</>)}
						</form>
					</article>
				</section>
				</>}
			</Registrar>	
			<footer className="footer">
				<h1 className="footer__h">© Tango Siempre</h1>
				<p className="footer__p">All rights reserved</p>
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
		return React.cloneElement(grandChild,
			//  { className: styles[String(props.style)] }
		)
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
	introduction: {starCount?: number, name: string, description: string}
	gallery: {
		 alt:string,src: string
}[],
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
	warning?: {	header: string,	note: { body: string[] }, refundPolicy: string, }
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
		header: { text:"Program", startDay: "22", endDay: "25", month: "June", year: 2022 },
		agenda: [
			{
				date:"22 June",
				day:"Thursday", 
				name:"Day 1",
				sessions:[
					{endTime: "16.00",startTime: "17.00", text: "Workshop 1",},
					{endTime: "17.30",startTime: "18.30", text: "Workshop 2",},
					{endTime: "19.00",startTime: "20.00", text: "Workshop 3",},
					{endTime: "22.00",startTime: "01.30", text: "Thursday Milonga",}
				],
			},
			{
				date:"23 June",
				day:"Friday", 
				name:"Day 2",
				sessions:[
					{endTime: "14.00",startTime: "18.00", text: "Pool Milonga",},
					{endTime: "21.00",startTime: "01.00", text: "Friday Milonga",}
				],
			},
			{
				date:"24 May",
				day:"Saturday", 
				name:"Day 3",
				sessions:[
					{endTime: "14.00",startTime: "18.00", text: "Pool Milonga",},
					{endTime: "21.00",startTime: "01.00", text: "Saturday Milonga",}
				],
			},
			{
				date:"25 May",
				day:"Sunday", 
				name:"Day 4",
				sessions:[
					{endTime: "14.00",startTime: "18.00", text: "Pool Milonga",},
				],
			},
		]
	}),
	tr:({
		header: { text:"Program", startDay: "24", endDay: "30", month: "Haziran", year: 2022 },
		agenda: [
			{
				date:"22 Haziran",
				day:"Perşembe", 
				name:"1. Gün",
				sessions:[
					{endTime: "16.00",startTime: "17.00", text: "Workshop 1",},
					{endTime: "17.30",startTime: "18.30", text: "Workshop 2",},
					{endTime: "19.00",startTime: "20.00", text: "Workshop 3",},
					{endTime: "22.00",startTime: "01.30", text: "Perşembe Milongası",}
				],
			},
			{
				date:"23 Haziran",
				day:"Cuma", 
				name:"2. Gün",
				sessions:[
					{endTime: "14.00",startTime: "18.00", text: "Havuz Milongası",},
					{endTime: "21.00",startTime: "01.00", text: "Cuma Milongası",}
				],
			},
			{
				date:"24 Haziran",
				day:"Cumartesi", 
				name:"3. Gün",
				sessions:[
					{endTime: "14.00",startTime: "18.00", text: "Havuz Milongası",},
					{endTime: "21.00",startTime: "01.00", text: "Cumartesi Milongası",}
				],
			},
			{
				date:"25 Haziran",
				day:"Pazar", 
				name:"4. Gün",
				sessions:[
					{endTime: "14.00",startTime: "18.00", text: "Havuz Milongası",},
				],
			},
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
				],
			}
		]
	}),
});
export const ACCOMMODATION_PROPS: Localized<AccommodationProps> = ({
	en:({
		header: {text: "Accommodation"},
		introduction: {
			name: "The Olive Tree Hotel",
			description: "The Hotel Olive Tree is sited in the northern part of Cyprus Island, welcoming guests to the beautiful setting of Kyrenia. "
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
			header: "The Olive Tree Hotel, Catalkoy", 
			description: "Offering an outdoor pool and an indoor cold pool for a refreshing experience, The Olive Tree Hotel is located in Catalkoy District of Kyrenia. Guests can benefit from the tennis courts, gym, sauna and concierge services. WiFi is free in all areas.",
			body: [
				{text: "0090 392 650 08 00"},
				{text: "info@hotelolivetree.com"},
				{text: "reservation@hotelolivetree.com"},
				{text: "İnönü Caddesi No. 89 Çatalköy - Girne Kıbrıs"}
			],
            checkInPrompt: "The check-in time is:",
            checkOutPrompt: "The check-out time is:",
			checkInTime: "14.00",
			checkOutTime: "12.00"
		},
		address: { 
			callToAction: "Olive Tree Website at:", 
			link: {href: "https://en.hotelolivetree.com/", text: "Olive Tree Hotel"}, 
			googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d52090.6938277247!2d33.388943!3d35.314221!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa3b20dbe0cf29a3b!2sThe%20Olive%20Tree%20Hotel!5e0!3m2!1sen!2sus!4v1670615532575!5m2!1sen!2sus",
		}
	} ),
	tr:({
		header: {text: "Konaklama"},
		introduction: {
			name: "Olive Tree Hotel",
			description: "Kuzey Kıbrıs Türk Cumhuriyetinde bulunan The Olive Tree Hotel, Girne’nin Beşparmak dağları yamacında zeytin ağaçları ile çevrili bölgenin güzide köyü Çatalköy’de yer almaktadır. Mükemmel konumu ile birçok manzarayı beraberinde sunmaktadır. Adada şehrin gürültüsü ve yoğunluğundan uzak; Sesiz ve sakin, sauna, masaj hizmetleri ile rahatlayabileceğiniz, kapalı ve açık yüzme havuzları, tenis kortu ile spor aktivitelerini gerçekleştirebileceğiniz eşsiz bir tesistir."
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
			header: "The Olive Tree Hotel, Catalkoy", 
			description: "Girne’nin Çatalköy Bölgesi’nde yer alan The Olive Tree Hotel'de serinlemeniz için açık havuz ve kapalı soğuk havuz vardır. Konuklar tenis kortları, spor salonu, sauna ve konsiyerj hizmetlerinden yararlanabilirler. Tüm alanlarda WiFi erişimi ücretsizdir.",
			body: [
				{text: "0090 392 650 08 00"},
				{text: "info@hotelolivetree.com"},
				{text: "reservation@hotelolivetree.com"},
				{text: "İnönü Caddesi No. 89 Çatalköy - Girne Kıbrıs"}
			],
            checkInPrompt: "Check-in saati:",
            checkOutPrompt: "Check-out saati:",
			checkInTime: "14.00",
			checkOutTime: "12.00"
		},
		address: { 
			callToAction: "Olive tree Web Sitesi için tıklayınız", 
			link: {href: "https://en.hotelolivetree.com/", text: "Olive Tree Hotel"}, 
			googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.6681727219825!2d33.386754414950914!3d35.31422575761981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6b2bf1bca1a1%3A0xa3b20dbe0cf29a3b!2sThe%20Olive%20Tree%20Hotel!5e0!3m2!1sen!2s!4v1670088003960!5m2!1sen!2s",
		}
	} ),
	gr:({
		header: {text: ""},
		introduction: {
			name: "The Olive Tree Hotel",
			description: ""
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
			header: "The Olive Tree Hotel, Catalkoy", 
			description: "",
			body: [
				{text: "0090 392 650 08 00"},
				{text: "info@hotelolivetree.com"},
				{text: "reservation@hotelolivetree.com"},
				{text: "İnönü Caddesi No. 89 Çatalköy - Girne Kıbrıs"}
			],
            checkInPrompt: "",
            checkOutPrompt: "",
			checkInTime: "14.00",
			checkOutTime: "12.00"
		},
		address: { 
			callToAction: "", 
			link: {href: "", text: "Olive Tree Hotel"}, 
			googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.6681727219825!2d33.386754414950914!3d35.31422575761981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6b2bf1bca1a1%3A0xa3b20dbe0cf29a3b!2sThe%20Olive%20Tree%20Hotel!5e0!3m2!1sen!2s!4v1670088003960!5m2!1sen!2s",
		}
	} ),
	ru:({
		header: {text: ""},
		introduction: {
			name: "The Olive Tree Hotel",
			description: ""
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
			header: "The Olive Tree Hotel, Catalkoy", 
			description: " ",
			body: [
				{text: "0090 392 650 08 00"},
				{text: "info@hotelolivetree.com"},
				{text: "reservation@hotelolivetree.com"},
				{text: "İnönü Caddesi No. 89 Çatalköy - Girne Kıbrıs"}
			],
            checkInPrompt: "",
            checkOutPrompt: "",
			checkInTime: "14.00",
			checkOutTime: "12.00"
		},
		address: { 
			callToAction: "", 
			link: {href: "", text: "Olive Tree Hotel"}, 
			googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3255.6681727219825!2d33.386754414950914!3d35.31422575761981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6b2bf1bca1a1%3A0xa3b20dbe0cf29a3b!2sThe%20Olive%20Tree%20Hotel!5e0!3m2!1sen!2s!4v1670088003960!5m2!1sen!2s",
			}
	} ),
});
export const ARTIST_PROPS: Localized<ArtistProps> = ({
	en:(({
		header: "DJs",
		cards: [
			{header:"DJ Rash", image: {alt:"", src:"tango-siempre/rash"}},
			{header:"DJ Engin", image: {alt:"", src:"tango-siempre/engin"}},
			{header:"DJ Jasmin", image: {alt:"", src:"tango-siempre/yasemin"}},
		],
	})),
	tr:(({
		header: "DJler",
		cards: [
			{header:"DJ Rash", image: {alt:"", src:"tango-siempre/rash"}},
			{header:"DJ Engin", image: {alt:"", src:"tango-siempre/engin"}},
			{header:"DJ Jasmin", image: {alt:"", src:"tango-siempre/yasemin"}},
		],
	} )),
	gr:(({
		header: "DJs",
		cards: [
			{header:"DJ Rash", image: {alt:"", src:"tango-siempre/rash"}},
			{header:"DJ Engin", image: {alt:"", src:"tango-siempre/engin"}},
			{header:"DJ Jasmin", image: {alt:"", src:"tango-siempre/yasemin"}},
		],
	} )),
	ru:(({
		header: "DJs",
		cards: [
			{header:"DJ Rash", image: {alt:"", src:"tango-siempre/rash"}},
			{header:"DJ Engin", image: {alt:"", src:"tango-siempre/engin"}},
			{header:"DJ Jasmin", image: {alt:"", src:"tango-siempre/yasemin"}},
		],
	} ))
});
export const PRICE_PROPS: Localized<PriceProps> = ({
	en:(({
		header: {
            main: "Prices",
			highlight: "Workshop Entrance fee is not included in the prices, each workshop to be taken costs 15 Euros.",
			note:{
				body: "",
				important: "",
			}
		},
		cards: [
			{ 
				image: {
					src: "", 
					alt: ""
				}, 
				roomType: "Double room", 
				visitDuration: 3,
                visitType: "nights of stay",
				pricePer: 200,
                perPersonPrompt: "Per Person",
				currency: "euros",
                visitMainAttraction: "All Milongas",
				text: "(Workshop Entrance fees do not apply!)", 
				},
			{
				image: {
					src: "", 
					alt: ""
				},
				roomType: "Double room",
				visitDuration: 2, 
                visitType: "nights of stay",
				currency: "euros",
				pricePer: 150,
                perPersonPrompt: "Per Person",
				visitMainAttraction: "All Milongas",
				text: "(Workshop Entrance fees do not apply!)", 
			},
			{
				image: {
					src: "", 
					alt: ""
				},
				roomType: "Single room",
				visitDuration: 3, 
                visitType: "nights of stay",
				currency: "euros",
				pricePer: 265,
                perPersonPrompt: "Per Person",
				visitMainAttraction: "All Milongas",
				text: "(Workshop Entrance fees do not apply!)", 
			},
			{
				image: {
					src: "", 
					alt: ""
				},
				roomType: "Single room",
				visitDuration: 2, 
                visitType: "nights of stay",
				currency: "euros",
				pricePer: 190,
                perPersonPrompt: "Per Person",
				visitMainAttraction: "All Milongas",
				text: "(Workshop Entrance fees do not apply!)", 
			},
		],
		
	} )),
	tr:(({
		header: {
            main: "Ücretler",

			highlight: "Workshop bedelleri fiyatlara dahil değildir.  Alınacak her workshop 15 Euro'dur",
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


