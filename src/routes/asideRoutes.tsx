import React from 'react';
import { RouteProps } from 'react-router-dom';
import { demoPagesMenu } from '../menu';
import DefaultAside from '../pages/_layout/_asides/DefaultAside';

const asides: RouteProps[] = [
	{ path: demoPagesMenu.login.path, element: null },
	{ path: '*', element: <DefaultAside /> },
];

export default asides;
