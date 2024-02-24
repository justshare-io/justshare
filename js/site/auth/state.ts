import {atom, useAtom} from "jotai/index";
import {Group, Groups, LoginResponse, User} from "@/rpc/user/user_pb";
import {userService} from "@/service";
import toast from "react-hot-toast";

const userKey = 'user';

const newLoginResponseAtom = () => {
    const getInitialValue = () => {
        const item = localStorage.getItem(userKey)
        if (item !== null) {
            try {
                return LoginResponse.fromJsonString(item);
            } catch (e) {
                console.error('failed to parse user from localstorage', e)
                localStorage.removeItem(userKey);
            }
        }
        return undefined;
    }
    const baseAtom = atom(getInitialValue())
    return atom(
        (get) => get(baseAtom),
        (get, set, update) => {
            const nextValue: LoginResponse =
                typeof update === 'function' ? update(get(baseAtom)) : update
            set(baseAtom, nextValue)
            if (nextValue) {
                try {
                    localStorage.setItem(userKey, nextValue.toJsonString())
                } catch (e) {
                    console.error('failed to save user to localstorage', e)
                }
            } else {
                localStorage.removeItem(userKey);
            }
        },
    )
}

const loginResponseAtom = newLoginResponseAtom();
loginResponseAtom.debugLabel = 'loginResponseAtom';

const groupsAtom = atom<Group[]>([]);
groupsAtom.debugLabel = 'groupsAtom';

export const useAuth = () => {
    const [loginResponse, setLoginResponse] = useAtom(loginResponseAtom);
    const [groups, setGroups] = useAtom(groupsAtom);

    const loadGroups = async () => {
        try {
            const res = await userService.getGroups({});
            setGroups(res.groups);
        } catch (e) {
            console.error('failed to load groups', e)
        }
    }

    const logout = async () => {
        try {
            // TODO breadchris save content to group
            const resp = await userService.logout({});
            setLoginResponse(undefined);
            console.log(resp);
            toast.success('Logged out');
        } catch (e) {
            toast.error('Failed to logout');
            console.error('failed to logout', e)
        }
    }

    const login = async (email: string, password: string) => {
        try {
            // TODO breadchris save content to group
            const resp = await userService.login({email, password});
            setLoginResponse(resp);
            toast.success('Logged in');
        } catch (e) {
            toast.error('Failed to login');
            console.error('failed to login', e)
        }
    }

    const register = async (email: string, password: string) => {
        try {
            const res = await userService.register({
                email,
                password,
            });
            setLoginResponse(res);
            toast.success('Successfully registered!');
        } catch (e: any) {
            console.error(e);
            toast.error('Failed to register: ' + e.message);
        }
    };

    const tryLogin = async () => {
        try {
            const res = await userService.login({});
            // TODO breadchris should login throw if not logged in?
            if (res.success) {
                setLoginResponse(res);
            } else {
                setLoginResponse(undefined);
            }
        } catch (e: any) {
            console.error(e);
            toast.error('Failed to login: ' + e.message);
        }
    }
    return {user: loginResponse?.user, loginResponse, register, tryLogin, login, logout, loadGroups, groups};
}
