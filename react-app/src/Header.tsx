import styled from '@emotion/styled';
import ReactCountryFlag from 'react-country-flag';
import { HEADER_SIZE } from './main';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const HeaderContainer = styled('header')(() => ({
	backgroundColor: 'transparent',
	display: 'flex',
	justifyContent: 'flex-end',
	padding: '1rem',
	gap: '1rem',
	height: HEADER_SIZE,
}));

const LangugeButton = styled('button')(() => ({
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
	height: '100%',
	width: 'auto',
	padding: 0,
}));

function Header() {
	const { i18n } = useTranslation();

	useEffect(() => {
		const locale = localStorage.getItem('locale');
		if (locale) {
			i18n.changeLanguage(locale);
		}
	}, [i18n]);

	const handleChangeLanguage = (locale: string) => {
		localStorage.setItem('locale', locale);
		i18n.changeLanguage(locale);
	};
	return (
		<HeaderContainer>
			<LangugeButton onClick={() => handleChangeLanguage('en')}>
				<ReactCountryFlag
					countryCode="US"
					svg
					style={{ width: 'auto%', height: '100%' }}
				/>
			</LangugeButton>
			<LangugeButton onClick={() => handleChangeLanguage('fr')}>
				<ReactCountryFlag
					countryCode="FR"
					svg
					style={{ width: 'auto%', height: '100%' }}
				/>
			</LangugeButton>
		</HeaderContainer>
	);
}

export default Header;
