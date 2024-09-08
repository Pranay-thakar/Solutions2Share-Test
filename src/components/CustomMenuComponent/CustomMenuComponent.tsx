import { MenuProps } from '@fluentui/react-northstar';
import React, { useState } from 'react';

interface CustomMenuComponentProps {
    menuData: MenuProps['items']
}

const MenuItem = ({ item }: { item: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        if (item?.menu?.items?.length > 0 || item?.menu?.length > 0) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div style={{ paddingLeft: '10px' }}>
            <div
                onClick={toggleMenu}
                style={{ cursor: item?.menu?.items?.length > 0 || item?.menu?.length > 0 ? 'pointer' : 'default', fontWeight: item?.menu?.items?.length > 0 || item?.menu?.length > 0 ? 'bold' : 'normal' }}
            >
                {
                    (item?.menu?.items?.length > 0 || item?.menu?.length > 0) &&
                    <span
                        style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            borderRight: '2px solid black',
                            borderBottom: '2px solid black',
                            transform: isOpen ? 'rotate(45deg)' : 'rotate(-45deg)',
                            marginRight: '5px',
                            transition: 'transform 0.3s ease'
                        }}
                    />
                }
                {item?.content}
            </div>

            {isOpen && (item.menu?.items?.length > 0 || item?.menu?.length > 0) && (
                <div style={{ paddingLeft: '20px', borderLeft: '2px solid #ccc', marginTop: '5px' }}>
                    {item.menu.items?.length > 0 ? item?.menu?.items?.map((child: any) => (
                        <MenuItem key={child.key} item={child} />
                    )) : item?.menu.map((child: any) => (
                        <MenuItem key={child.key} item={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

const CustomMenuComponent: React.FC<CustomMenuComponentProps> = ({ menuData }) => {
    return (
        <div style={{ width: '200px', fontFamily: 'Arial, sans-serif', border: '1px solid #ccc', padding: '10px' }}>
            {menuData?.map((item: any) => (
                <MenuItem key={item?.key} item={item} />
            ))}
        </div>
    );
};

export default CustomMenuComponent;
