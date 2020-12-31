const { React, i18n: { Messages } } = require("powercord/webpack");
const { FormTitle, Button } = require("powercord/components");
const { TextAreaInput } = require("powercord/components/settings");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");

module.exports = class unlockFolder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            userHasInputed: false,
            incorrect: false
        };
        this.hasUserInputed = () => {
            if (!this.state.password) {
                this.setState({ userHasInputed: false });
            } else {
                this.setState({ userHasInputed: true });
            }
        };
    }

    render() {
        return (
            <Modal className="powercord-text">
                <Modal.Header>
                    <FormTitle tag="h4">{Messages.PASSWORD_SYSTEM.UNLOCK_FOLDER}</FormTitle>
                </Modal.Header>
                <Modal.Content>
                    <TextAreaInput
                        onChange={async (o) => {
                            await this.setState({ password: o.toString() });
                            this.hasUserInputed();
                        }}
                        rows={1}
                    >{Messages.PASSWORD_SYSTEM.PASSWORD}</TextAreaInput>
                    <h5 className="colorStandard-2KCXvj size14-e6ZScH h5-18_1nd title-3sZWYQ defaultMarginh5-2mL-bP" hidden={!this.state.incorrect} >{Messages.PASSWORD_SYSTEM.INCORRECT_PASSWORD}</h5>
                </Modal.Content>
                <Modal.Footer>
                    <Button
                        disabled={!this.state.userHasInputed}
                        onClick={() => {
                            const password = this.props.settings.get(this.props.args[0].folderId.toString())
                            if(btoa(this.state.password) === password) {
                                this.props.settings.set("unlocked_" + this.props.args[0].folderId.toString(), true)
                                return closeModal()
                            }
                            this.setState({ incorrect: true })
                            this.render()
                            this.props.settings.set("unlocked_" + this.props.args[0].folderId.toString(), false)
                        }}
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