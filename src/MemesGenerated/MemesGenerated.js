import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import styles from './styles.module.css';
import { useClipboard } from 'use-clipboard-copy';

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
        </div>
    )
}

export default MemesGenerated
