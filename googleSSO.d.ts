import * as React from 'react';
import { objectType } from "./types";
interface IProps {
    client_id: string;
    onResolve: Function;
    onReject: Function;
    cookie_policy?: string;
    scope?: string;
    fetch_basic_profile?: boolean;
    hosted_domain?: string;
    openid_realm?: string;
    ux_mode?: string;
    redirect_uri?: string;
    prompt?: string;
    response_type?: string;
    login_hint?: string;
    discoveryDocs?: string;
    access_type?: string;
    isDisabled?: boolean;
    className?: string;
    children?: any;
}
interface IStates {
    isSdkLoaded: boolean;
    isProgressing: boolean;
}
declare class GoogleSSO extends React.PureComponent<IProps, IStates> {
    constructor(props: IProps);
    private JS_SRC;
    private SCRIPT_ID;
    private SCOPE;
    private _window;
    static defaultProps: {
        cookie_policy: string;
        scope: string;
        fetch_basic_profile: boolean;
        ux_mode: string;
        prompt: string;
        response_type: string;
        login_hint: string;
        discoveryDocs: string;
        access_type: string;
        isDisabled: boolean;
        redirect_uri: string;
        hosted_domain: string;
        openid_realm: string;
        className: string;
        children: string;
    };
    componentDidMount(): void;
    checkIsExistsSDKScript(): boolean;
    insertScriptGoogle(d: HTMLDocument, s: string | undefined, id: string, jsSrc: string, cb: () => void): void;
    handleResponse(res: objectType | string): void;
    handleError(err: objectType | string): void;
    loginGoogle(): void;
    render(): JSX.Element;
}
export default GoogleSSO;
