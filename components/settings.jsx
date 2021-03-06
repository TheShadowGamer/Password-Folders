const { React, i18n: { Messages }  } = require('powercord/webpack');
const { TextAreaInput } = require("powercord/components/settings");
const { Button } = require("powercord/components");
const { SwitchItem } = require('powercord/components/settings');

module.exports = class Settings extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            password: "",
            link: "",
        };
    }
    render () { 
        return (
            <div>
                <SwitchItem
                    value={this.props.getSetting("lockDiscord", false)}
                    onChange={() => {
                        this.props.toggleSetting('lockDiscord', false)
                    }}
                >{Messages.PASSWORD_SYSTEM.DISCORD_PASSWORD}</SwitchItem>
                {this.props.getSetting("lockDiscord", false) && (
                    <div>
                        <TextAreaInput
                            placeholder={atob(this.props.getSetting("password_Discord", ''))}
                            onChange={async (o) => {
                                await this.setState({ password: o.toString() });
                                this.hasUserInputed();
                            }}
                            rows={1}
                        >{Messages.PASSWORD_SYSTEM.PASSWORD}</TextAreaInput>
                        <Button
                            disabled={this.state.password.length === 0}
                            onClick={() => {
                                this.props.updateSetting("password_Discord", btoa(this.state.password))
                            }}
                        >{Messages.PASSWORD_SYSTEM.SET_PASSWORD}</Button>
                        <br></br>
                        <SwitchItem
                            value={this.props.getSetting("openLink", false)}
                            onChange={() => {
                                this.props.toggleSetting('openLink', false)
                            }}
                        >{Messages.PASSWORD_SYSTEM.PS_OPEN_LINK}</SwitchItem>
                        {this.props.getSetting("openLink", false) && (
                            <div>
                                <TextAreaInput
                                    placeholder={this.props.getSetting("LinkToOpen", "https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
                                    onChange={async (o) => {
                                        await this.setState({ link: o.toString() });
                                        this.hasUserInputedLink();
                                    }}
                                    rows={1}
                                >{Messages.PASSWORD_SYSTEM.LINK_TO_OPEN}</TextAreaInput>
                                <Button
                                    disabled={this.state.link.length === 0}
                                    onClick={() => {
                                        this.props.updateSetting("LinkToOpen", this.state.link)
                                    }}
                                >{Messages.PASSWORD_SYSTEM.SET_LINK}</Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}