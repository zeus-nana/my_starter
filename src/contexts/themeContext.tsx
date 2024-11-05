import React, { createContext, useLayoutEffect, useState, useMemo, FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import useDeviceScreen from '../hooks/useDeviceScreen';

export interface IThemeContextProps {
	asideStatus: boolean;
	darkModeStatus: boolean;
	fullScreenStatus: boolean;
	leftMenuStatus: boolean;
	mobileDesign: boolean;
	rightMenuStatus: boolean;
	rightPanel: boolean;
	setAsideStatus: (value: ((prevState: boolean) => boolean) | boolean) => void;
	setDarkModeStatus: (value: ((prevState: boolean) => boolean) | boolean) => void;
	setFullScreenStatus: (value: ((prevState: boolean) => boolean) | boolean) => void;
	setLeftMenuStatus: (value: ((prevState: boolean) => boolean) | boolean) => void;
	setRightMenuStatus: (value: ((prevState: boolean) => boolean) | boolean) => void;
	setRightPanel: (value: ((prevState: boolean) => boolean) | boolean) => void;
}
const ThemeContext = createContext<IThemeContextProps>({} as IThemeContextProps);

interface IThemeContextProviderProps {
	children: ReactNode;
}
export const ThemeContextProvider: FC<IThemeContextProviderProps> = ({ children }) => {
	const deviceScreen = useDeviceScreen();
	// @ts-ignore
	const mobileDesign = deviceScreen?.width <= import.meta.env.VITE_MOBILE_BREAKPOINT_SIZE;

	const [darkModeStatus, setDarkModeStatus] = useState(
		localStorage.getItem('freuzo_darkModeStatus')
			? localStorage.getItem('freuzo_darkModeStatus') === 'true'
			: import.meta.env.VITE_DARK_MODE === 'true',
	);

	useLayoutEffect(() => {
		localStorage.setItem('freuzo_darkModeStatus', darkModeStatus.toString());
	}, [darkModeStatus]);

	const [fullScreenStatus, setFullScreenStatus] = useState(false);

	const [leftMenuStatus, setLeftMenuStatus] = useState(false);
	const [rightMenuStatus, setRightMenuStatus] = useState(false);
	const [asideStatus, setAsideStatus] = useState(
		localStorage.getItem('freuzo_asideStatus')
			? localStorage.getItem('freuzo_asideStatus') === 'true'
			: // @ts-ignore
			  deviceScreen?.width >= import.meta.env.VITE_ASIDE_MINIMIZE_BREAKPOINT_SIZE,
	);
	useLayoutEffect(() => {
		localStorage.setItem('freuzo_asideStatus', asideStatus?.toString());
	}, [asideStatus]);

	const [rightPanel, setRightPanel] = useState(false);

	useLayoutEffect(() => {
		// @ts-ignore
		if (deviceScreen?.width >= import.meta.env.VITE_ASIDE_MINIMIZE_BREAKPOINT_SIZE) {
			if (localStorage.getItem('freuzo_asideStatus') === 'true') setAsideStatus(true);
			setLeftMenuStatus(false);
			setRightMenuStatus(false);
		}
		return () => {
			setAsideStatus(false);
		};
	}, [deviceScreen.width]);

	const values: IThemeContextProps = useMemo(
		() => ({
			mobileDesign,
			darkModeStatus,
			setDarkModeStatus,
			fullScreenStatus,
			setFullScreenStatus,
			asideStatus,
			setAsideStatus,
			leftMenuStatus,
			setLeftMenuStatus,
			rightMenuStatus,
			setRightMenuStatus,
			rightPanel,
			setRightPanel,
		}),
		[
			asideStatus,
			darkModeStatus,
			fullScreenStatus,
			leftMenuStatus,
			mobileDesign,
			rightMenuStatus,
			rightPanel,
		],
	);

	return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
};
ThemeContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ThemeContext;
