import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="left_side">
                <div className="footer__social">
                    <a
                        href="https://www.linkedin.com/groups/9509612/"
                        target="_"
                    >
                        <img
                            src="/icons/linkedin-icon.png"
                            alt="linkedin"
                            width="32"
                        />
                    </a>
                    <a
                        href="https://github.com/FlorPManzano/RetroPoP"
                        target="_"
                    >
                        <img
                            src="/icons/github-icon.png"
                            alt="GitHub"
                            width="32"
                        />
                    </a>
                    <a href="https://www.instagram.com/" target="_">
                        <img
                            src="/icons/instagram.png"
                            alt="instagram"
                            width="32"
                        />
                    </a>
                    <a href="https://www.facebook.com/" target="_">
                        <img
                            src="/icons/facebook.png"
                            alt="facebook"
                            width="32"
                        />
                    </a>
                    <a href="https://twitter.com/" target="_">
                        <img
                            src="/icons/twitter.png"
                            alt="twitter"
                            width="32"
                        />
                    </a>
                </div>
            </div>

            <div className="right_side">
                <div className="footer__logo">
                    <img src="/logo-retropop.png" alt="logo" width="32" />
                </div>
                <p className="p-footer">
                    &copy; {`Retropop ${new Date().getFullYear()}`}
                </p>
            </div>
        </footer>
    );
}
