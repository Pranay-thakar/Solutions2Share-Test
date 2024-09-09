import { useEffect, useState } from "react";
import { AcceptIcon, AddIcon, Alert, Box, Button, Divider, Dropdown, DropdownProps, Flex, Input, MenuProps, Text } from "@fluentui/react-northstar"
import CustomMenuComponent from "../CustomMenuComponent/CustomMenuComponent";

interface NavigationConfigProps {
    menuItems: MenuProps['items'],
}

const NavigationConfig: React.FC<NavigationConfigProps> = ({ menuItems }) => {
    const [dropdownVal, setDropdownVal] = useState<any>("");
    const [newMenuItem, setNewMenuItem] = useState<any>("");
    const [menuItemsList, setMenuItemsList] = useState<string[]>([]);
    const [menuItemAddedSuccess, setMenuItemAddedSuccess] = useState<boolean>(false);

    const collectContentValues = (items: any[], result: string[] = []): string[] => {
        for (const item of items) {
            if (item.content) {
                result.push(item.content);
            }
            if (item?.menu?.length > 0) {
                collectContentValues(item.menu, result);
            }
            if (item?.menu?.items?.length > 0) {
                collectContentValues(item.menu.items, result);
            }
        }
        return result;
    };

    const addSubMenu = (parentContent: string, newSubMenu: any, items: any[]) => {
        for (const item of items) {
            if (item.content === parentContent) {
                if (!item.menu) {
                    item.menu = {};
                    item.menu.items = [];
                }
                item.menu.items.push(newSubMenu);
                return;
            }

            if (item?.menu?.length > 0) {
                addSubMenu(parentContent, newSubMenu, item.menu);
            }

            if (item?.menu?.items?.length > 0) {
                addSubMenu(parentContent, newSubMenu, item.menu.items);
            }
        }
    };


    const handleAddMenuItem = () => {
        if (dropdownVal && newMenuItem && menuItems) {
            const newSubMenu = { key: newMenuItem, content: newMenuItem, on: 'hover' };
            addSubMenu(dropdownVal, newSubMenu, menuItems);
            localStorage.setItem('itemsData', JSON.stringify(menuItems));
            const updatedContentValues = menuItemsList.concat(newMenuItem);
            setMenuItemsList(updatedContentValues);

            setDropdownVal("");
            setNewMenuItem("");
            setMenuItemAddedSuccess(true);
            setTimeout(() => {
                setMenuItemAddedSuccess(false);
            }, 2000);
        }
    };

    useEffect(() => {
        if (menuItems) {
            const itemsData = collectContentValues(menuItems);
            setMenuItemsList(itemsData);
        }
    }, [menuItems]);
    return (
        <>
            <Flex gap="gap.small" styles={{ height: '93.6vh' }}>
                <Box
                    styles={{
                        maxWidth: '20%',
                        minWidth: '15%',
                        padding: '1rem',
                    }}
                >
                    <Flex gap="gap.small" column>
                        <Text weight="bold" content="Navigation Entries" size="medium" />
                        <Divider />
                        <CustomMenuComponent menuData={menuItems} />
                    </Flex>
                </Box>
                <Divider vertical />
                <Box
                    styles={{
                        maxWidth: '80%',
                        padding: '1rem',
                    }}
                >
                    <Flex gap="gap.large" column>
                        {menuItemAddedSuccess && <Alert icon={<AcceptIcon />} success content="Successfully added the menu item" dismissible />}
                        <Flex gap="gap.small" column>
                            <Text weight="bold" content="Configure Navigation" size="large" />
                            <Text weight="light" content="The megamenu should be configured here" size="small" />
                        </Flex>
                        <Flex gap="gap.small" column>
                            <Text weight="bold" content="Add navigation entries" size="large" />
                            <Text weight="light" content="Here you can add new navigation entries" size="small" />
                        </Flex>
                        <Flex gap="gap.small">
                            {dropdownVal?.length > 0 &&
                                <>
                                    <Button size="medium" icon={<AddIcon />} content="Add entry" iconPosition="before" primary onClick={handleAddMenuItem} />
                                    <Input
                                        clearable placeholder="Add menu item"
                                        value={newMenuItem}
                                        onChange={(e: any) => setNewMenuItem(e?.target.value)}
                                    />
                                </>
                            }
                            <Dropdown
                                items={menuItemsList}
                                placeholder="Search for a navigation entry"
                                clearable
                                value={dropdownVal}
                                onChange={(e: React.MouseEvent | React.KeyboardEvent | null, data: DropdownProps) => setDropdownVal(data?.value)}
                            />
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}

export default NavigationConfig