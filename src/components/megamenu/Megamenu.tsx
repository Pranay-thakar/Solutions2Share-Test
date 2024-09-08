import { Menu, MenuProps } from '@fluentui/react-northstar'

interface MegamenuProps {
    items: MenuProps['items']
}

const Megamenu: React.FC<MegamenuProps> = ({ items }) => {
    return (
        <>
            <Menu defaultActiveIndex={0} items={items} />
        </>
    )
}

export default Megamenu