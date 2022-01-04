import React,{useEffect, useRef} from 'react';
import '../App.css';
import {refreshToken} from '../slices/authentication/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loadingspinner from './Loadingspinner';
import {NavLink} from 'react-router-dom';

export default function Header(){
	const { isAuthenticated, links} = useSelector(state => state.authentication);
	const fetched = useRef(false);
  	const dispatch = useDispatch();
  	useEffect(()=>{
	    dispatch(refreshToken());
		fetched.current = true;
	    // eslint-disable-next-line
  	},[]);
  	if(fetched.current===false && isAuthenticated===true){
	    return(<Loadingspinner/>);
  	}else{
	    return (
			<nav className='navbar navbar-expand-lg navbar-light' style={{'backgroundColor':'#B0E0E6'}}>
        	    <div className='container-fluid'>
            	    <a className='navbar-brand' style={{'color':'#C71585'}} href='/'>Opticonnect</a>
					<button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarToggler' aria-controls='navbarToggler' aria-expanded='false' aria-label='Toggle navigation'>
	      				<span className='navbar-toggler-icon'></span>
    				</button>
        	        <div className='collapse navbar-collapse' id='navbarToggler'>
						<div className='ms-auto p-2 bd-highlight'>
                	    	<ul className='navbar-nav mb-2 mb-lg-0'>
								{links!==undefined ? links.map(({title,path})=>(
									<li className='nav-item' key={title}>
										<NavLink className='nav-link' style={{'color':'#750D37'}} aria-current='page' to={path}>
											{title}
										</NavLink>
									</li>
								)):null}
            	    	    </ul>
						</div>
                	</div>
            	</div>
        	</nav>
	    );
	}
}