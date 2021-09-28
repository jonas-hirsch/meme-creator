import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styles from './styles.module.css';
import { useClipboard } from 'use-clipboard-copy';
import {SocialIcon} from "react-social-icons"


const MemesGenerated = () => {

    const [copied, setCopied] = useState(false);

    const history = useHistory();
    const location = useLocation();
    const clipboard = useClipboard();
    const url = new URLSearchParams(location.search).get('url');

    const copyLink = () => {
        clipboard.copy(url);
        setCopied(true);
    };


    return (
        <div className={styles.container}>
            { url && <img src={url} alt='Your generated Meme should be shown here'/>}
            <button onClick={copyLink} className={styles.copy}>
                {copied ? 'Link copied!' : 'Copy link'}
            </button>
            <button onClick={() => history.push('/')} className={styles.home}>
                Make more Memes
            </button>
            <div className={styles.SocialMediaWrapper}>
              <SocialIcon network="twitter" url={`http://twitter.com/share?text=${"Check This Out!"}&url=${url}` } target="_blank" style={{margin: 5}} />
              <SocialIcon network="facebook" url={`http://www.facebook.com/sharer.php?u=${url}`}  target="_blank" style={{margin: 5}} />
              <SocialIcon network="pinterest" url={`http://pinterest.com/pin/create/button/?url=${url}&description=${"Check This Out!"}`} target="_blank" style={{margin: 5}} />              
            </div>
        </div>
    )
}

export default MemesGenerated
