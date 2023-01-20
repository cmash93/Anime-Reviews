import React, { useState } from 'react';


function NavBar() {
    const [visible, setVisible] = useState(false)
  
    const onClose = () => {
      setVisible(false)
    };

/* const Navbar = () => { */
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

export default NavBar;