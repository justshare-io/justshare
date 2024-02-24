import {useProjectContext} from "@/react/ProjectProvider";
import React, {useEffect, useState} from "react";
import {baseURL, userService} from "@/service";
import toast from "react-hot-toast";
import {useAuth} from "@/auth/state";
import {Modal} from "@/components/modal";
import {ShareIcon} from "@heroicons/react/24/outline";

export const GroupDialog: React.FC<{open: boolean, onClose: () => void}> = ({open, onClose}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <h3 className="font-bold text-lg">Groups</h3>
            <GroupManager />
            <div className="flex justify-end">
                <button className="btn" onClick={onClose}>close</button>
            </div>
        </Modal>
    )
}

const GroupMenu: React.FC<{id: string, setInvite: (invite: string) => void}> = ({ id, setInvite }) => {
    const {loadGroups} = useProjectContext();
    const deleteGroup = async () => {
        try {
            const res = await userService.deleteGroup({id})
            toast.success('deleted group');
            loadGroups();
        } catch (e: any) {
            toast.error('failed to delete group');
            console.error(e);
        }
    }
    const createInvite = async () => {
        try {
            const res = await userService.createGroupInvite({
                groupId: id,
            })
            toast.success('created invite');
            setInvite(`${baseURL}/app/group/join/${res.secret}`);
        } catch (e: any) {
            toast.error('failed to create invite');
            console.error(e);
        }
    }
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
                <ShareIcon className="h-5 w-5" />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><button className={"btn"} onClick={createInvite}>Invite</button></li>
                <li><button className={"btn"} onClick={deleteGroup}>Delete</button></li>
            </ul>
        </div>
    )
}

const GroupManager = () => {
    const {groups, loadGroups} = useAuth();
    const [name, setName] = useState<string>('');
    const [invite, setInvite] = useState<string|undefined>(undefined);

    useEffect(() => {
        void loadGroups();
    }, []);

    const addGroup = async () => {
        try {
            const res = await userService.createGroup({name})
            toast.success('Created group');
            loadGroups();
        } catch (e: any) {
            toast.error('Failed to create group');
            console.error(e);
        }
    }
    return (
        <div>
            <div className="flex gap-4 mb-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered" />
                <button className="btn" onClick={addGroup}>Add Group</button>
            </div>
            {invite && <a href={invite} className="link">{invite}</a>}
            <div className="divider"></div>
            <ul className="space-y-4">
                {groups.map((g) => (
                    <li key={g.id} className={"flex justify-between"}>
                        <div className={"flex min-w-0 gap-x-4"}>
                            {g.name}
                        </div>
                        <div className={"shrink-0 sm:flex sm:flex-col sm:items-end"}>
                            <GroupMenu id={g.id} setInvite={setInvite} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

