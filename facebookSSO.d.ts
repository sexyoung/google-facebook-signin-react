import * as React from 'react';
import { objectType } from "./types";
interface IProps {
    appId: string;
    onResolve: Function;
    onReject: Function;
    scope?: string;
    redirect_uri?: string;
    state?: string;
    auth_type?: string;
    response_type?: string;
    return_scopes?: boolean;
    enable_profile_selector?: boolean;
    profile_selector_id?: boolean;
    language?: string;
    isDisabled?: boolean;
    fieldsProfile?: string;
    xfbml?: boolean;
    version?: string;
    cookie?: boolean;
    className?: string;
    chidren?: any;
}
interface IStates {
    isSdkLoaded: boolean;
    isProgressing: boolean;
}
declare class FacebookSSO extends React.PureComponent<IProps, IStates> {
    constructor(props: IProps);
    private SDK_URL;
    private SCRIPT_ID;
    private _window;
    static defaultProps: {
        scope: string;
        redirect_uri: string;
        state: string;
        response_type: string;
        auth_type: string;
        return_scopes: boolean;
        enable_profile_selector: boolean;
        profile_selector_id: boolean;
        language: string;
        fieldsProfile: string;
        xfbml: boolean;
        version: string;
        cookie: boolean;
        isDisabled: boolean;
        className: string;
        children: string;
    };
    componentDidMount(): void;
    insertSDKScript(document: HTMLDocument, cb: () => void): void;
    checkIsExistsSDKScript(): boolean;
    initFbSDK(config: objectType, document: HTMLDocument): void;
    getMe(authResponse: objectType): void;
    handleResponse(response: objectType): void;
    loginFB(): void;
    render(): JSX.Element;
}
export default FacebookSSO;
