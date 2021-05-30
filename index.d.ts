import * as React from 'react';
import './styles.css';
export declare type PropGoogle = {
    onResolve: Function;
    onReject: Function;
    client_id: string;
    className?: string;
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
    children?: any;
};
export declare type PropFacebook = {
    onResolve: Function;
    onReject: Function;
    appId: string;
    className?: string;
    scope?: string;
    redirect_uri?: string;
    state?: string;
    response_type?: string;
    auth_type?: string;
    return_scopes?: boolean;
    enable_profile_selector?: boolean;
    profile_selector_id?: boolean;
    language?: string;
    isDisabled?: boolean;
    fieldsProfile?: string;
    xfbml?: boolean;
    version?: string;
    cookie?: boolean;
    children?: any;
};
export declare class GoogleSignIn extends React.Component<PropGoogle> {
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
    render(): JSX.Element;
}
export declare class FacebookSignIn extends React.Component<PropFacebook> {
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
    render(): JSX.Element;
}
