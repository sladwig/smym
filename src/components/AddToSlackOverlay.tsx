import React, { useState } from 'react';
import './AddToSlackOverlay.css';

export const AddToSlackOverlay = ({}) => {
    const [show, set] = useState(false);
    return (
        <div className="add-to-slack-overlay">
            <div className="welcome heading-1">welcome</div>

            <div onClick={() => set(true)}>
                <img
                    alt="Add to Slack"
                    height="40"
                    width="139"
                    src="https://platform.slack-edge.com/img/add_to_slack.png"
                    srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
                />
            </div>
            <div>&nbsp;{show && 'not working yet'}</div>
        </div>
    );
};
