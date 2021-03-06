const { React, i18n: { Messages } } = require("powercord/webpack");
const { FormTitle, Button } = require("powercord/components");
const TextInputWithButton = require("../TextInputWithButton")
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");

module.exports = class unlockFolder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            hidePassword: false,
            incorrect: false
        };
        this.submit = () => {
            if(this.state.password.length === 0) return
            const password = this.props.settings.get("folder_" + this.props.args[0].folderId.toString())
            if(btoa(this.state.password) === password) {
                this.props.settings.set("unlocked_folder_" + this.props.args[0].folderId.toString(), true)
                return closeModal()
            }
            this.setState({ incorrect: true })
            this.render()
            this.props.settings.set("unlocked_folder_" + this.props.args[0].folderId.toString(), false)
        }
    }

    render() {
        return (
            <Modal className="powercord-text">
                <Modal.Header>
                    <FormTitle tag="h4">{Messages.PASSWORD_SYSTEM.UNLOCK_FOLDER}</FormTitle>
                </Modal.Header>
                <Modal.Content>
                    <TextInputWithButton
                        onKeyPress={async (e) => {
                            if(e.charCode == 13) this.submit()
                        }}
                        textBoxId={"PASSWORD-SYSTEM-CURRENT-PASSWORD"}
                        buttonIcon={`${this.state.hidePassword ? `far fa-eye` : `far fa-eye-slash`}`}
                        buttonText={Messages.PASSWORD_SYSTEM[`${this.state.hidePassword ? 'SHOW' : 'HIDE'}_PASSWORD`]}
                        buttonOnClick={async (o) => {
                            const text = document.getElementById("PASSWORD-SYSTEM-CURRENT-PASSWORD")
                            if(text.getAttribute('type') == "password") {
                                text.setAttribute('type', 'text')
                                this.setState({ "hidePassword": false })
                            } else {
                                text.setAttribute('type', 'password')
                                this.setState({ "hidePassword": true })
                            }
                            this.render()
                        }}
                        onChange={async (o) => {
                            await this.setState({ password: o.toString() });
                        }}
                    >{Messages.PASSWORD_SYSTEM.CURRENT_PASSWORD}</TextInputWithButton>
                    <h5 className="colorStandard-2KCXvj size14-e6ZScH h5-18_1nd title-3sZWYQ defaultMarginh5-2mL-bP" hidden={!this.state.incorrect} >{Messages.PASSWORD_SYSTEM.INCORRECT_PASSWORD}</h5>
                </Modal.Content>
                <Modal.Footer>
                    <Button
                        disabled={this.state.password.length === 0}
                        onClick={() => this.submit()}
                    >{Messages.PASSWORD_SYSTEM.UNLOCK}</Button>
                    <Button
                        onClick={closeModal}
                        look={Button.Looks.LINK}
                        color={Button.Colors.TRANSPARENT}
                    >
                        {Messages.PASSWORD_SYSTEM.CANCEL}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}