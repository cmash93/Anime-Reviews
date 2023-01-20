import React, { useState } from 'react';
import { Drawer, Button, Icon } from 'antd';

function NavBar() {
    const [visible, setVisible] = useState(false)
  
    const showDrawer = () => {
      setVisible(true)
    };
  
    const onClose = () => {
      setVisible(false)
    };


    return (
        <nav class='navbar'>
            <div class='navbar-logo'>
                <a href=''>AniMake an Anime Review</a>
            </div>
            <ul class='nav-links'>
                <div class='nav-menu'>
                    <li class='searchAnime'><a href=''>Search Anime</a></li>
                    <li class='savedAnime'><a href=''>Saved Anime</a></li>
                    {/* {{#if logged_in}} */}
                    <li class=''>Logout</li>
                    {/* {{else}} */}
                    <li class='logIn'><a href=''>Log In</a></li>
                    <li class='create'><a href=''>Create Account</a></li>
                    {/* {{/if}} */}
                </div>
            </ul>
        </nav>



    )

}