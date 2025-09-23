import { extendTheme } from '@chakra-ui/react';
import { globalStyles } from './styles';
import { breakpoints } from './foundations/breakpoints';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { linkStyles } from './components/link';
import { drawerStyles } from './components/drawer';
import { CardComponent } from './additions/card/Card';
import { CardBodyComponent } from './additions/card/CardBody';
import { CardHeaderComponent } from './additions/card/CardHeader';
import { MainPanelComponent } from './additions/layout/MainPanel';
import { PanelContentComponent } from './additions/layout/PanelContent';
import { PanelContainerComponent } from './additions/layout/PanelContainer';
// import { mode } from "@chakra-ui/theme-tools";
const colors = {
	brand: {
		50: '#E6FFFA',
		100: '#B2F5EA',
		200: '#81E6D9',
		300: '#4FD1C7',
		400: '#38B2AC',
		500: '#319795',
		600: '#2C7A7B',
		700: '#285E61',
		800: '#234E52',
		900: '#1D4044'
	}
};

const components = {
	Button: {
		defaultProps: { colorScheme: 'brand' }
	},
	Badge: {
		defaultProps: { colorScheme: 'brand' }
	}
};

export default extendTheme(
	{ breakpoints, colors, components }, // Breakpoints and brand colors
	globalStyles,
	buttonStyles, // Button styles
	badgeStyles, // Badge styles
	linkStyles, // Link styles
	drawerStyles, // Sidebar variant for Chakra's drawer
	CardComponent, // Card component
	CardBodyComponent, // Card Body component
	CardHeaderComponent, // Card Header component
	MainPanelComponent, // Main Panel component
	PanelContentComponent, // Panel Content component
	PanelContainerComponent // Panel Container component
);
