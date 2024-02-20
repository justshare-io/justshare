import { BlockSchema } from "@blocknote/core";
import { Menu } from "@mantine/core";
import { MdDragIndicator } from "react-icons/md";
import {SideMenuProps} from "@/components/JustShareSideMenu";
import {
    BlockColorsButton,
    DragHandleMenu,
    DragHandleMenuItem,
    DragHandleMenuProps,
    RemoveBlockButton,
    SideMenuButton
} from "@blocknote/react";
import {ReactNode} from "react";

export const AddBlockButton = <BSchema extends BlockSchema>(
    props: DragHandleMenuProps<BSchema, any, any> & { children: ReactNode }
) => {
    return (
        <DragHandleMenuItem
            onClick={props.editor.sideMenu.addBlock}>
            {props.children}
        </DragHandleMenuItem>
    );
};

export const DefaultDragHandleMenu = <BSchema extends BlockSchema>(
    props: DragHandleMenuProps<BSchema, any, any>
) => (
    <DragHandleMenu>
        {/*<AddBlockButton {...props}>Add</AddBlockButton>*/}
        <RemoveBlockButton {...props}>Delete</RemoveBlockButton>
        <BlockColorsButton {...props}>Colors</BlockColorsButton>
    </DragHandleMenu>
);
export const JustShareDragHandle = <BSchema extends BlockSchema>(
    props: SideMenuProps<BSchema, any, any>
) => {
    const DragHandleMenu = props.dragHandleMenu || DefaultDragHandleMenu;

    return (
        <Menu
            withinPortal={false}
            trigger={"click"}
            onOpen={props.freezeMenu}
            onClose={props.unfreezeMenu}
            width={100}
            position={"left"}>
            <Menu.Target>
                <div
                    className={"bn-drag-handle"}
                    draggable="true"
                    onDragStart={props.blockDragStart}
                    onDragEnd={props.blockDragEnd}>
                    <SideMenuButton>
                        <MdDragIndicator size={24} data-test={"dragHandle"} />
                    </SideMenuButton>
                </div>
            </Menu.Target>
            <DragHandleMenu editor={props.editor} block={props.block} />
        </Menu>
    );
};
