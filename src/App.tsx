import { MenuProps, MenuIcon, MoreIcon } from "@fluentui/react-northstar";
import Megamenu from "./components/megamenu/Megamenu";
import NavigationConfig from "./components/NavigationConfig/NavigationConfig";
import { useState } from "react";

const itemsData: MenuProps['items'] = [
  {
    key: 'FirstIconButton',
    icon: <MenuIcon />,
  },
  {
    key: 'MenuItem-1',
    content: 'MenuItem-1',
    on: 'hover',
    menu: {
      items: [
        {
          key: '1',
          on: 'hover',
          content: 'MenuItem-1.1',
        },
        {
          key: '2',
          on: 'hover',
          content: 'MenuItem-1.2',
          menu: [
            {
              key: '1',
              content: 'MenuItem-1.2.1',
              on: 'hover',
              menu: [
                {
                  key: '1',
                  content: 'MenuItem-1.2.1.1'
                }
              ]
            },
            {
              key: '2',
              content: 'MenuItem-1.2.2',
            },
          ],
        },
        {
          key: '3',
          on: 'hover',
          content: 'MenuItem-1.3',
          menu: [
            {
              key: '1',
              content: 'MenuItem-1.3.1',
            },
            {
              key: '2',
              content: 'MenuItem-1.3.2',
              on: 'hover',
              menu: [
                {
                  key: '1',
                  content: 'MenuItem-1.3.2.1'
                }
              ]
            },
            {
              key: '3',
              content: 'MenuItem-1.3.3',
            },
          ],
        },
      ],
    },
  },
  {
    key: 'MenuItem-2',
    content: 'MenuItem-2',
    on: 'hover',
    menu: {
      items: [
        {
          key: '1',
          on: 'hover',
          content: 'MenuItem-2.1',
          menu: [
            {
              key: '1',
              content: 'MenuItem-2.1.1',
              on: 'hover',
              menu: [
                {
                  key: '1',
                  content: 'MenuItem-2.1.1.1',
                },
                {
                  key: '2',
                  content: 'MenuItem-2.1.1.2',
                }
              ]
            },
            {
              key: '2',
              content: 'MenuItem-2.1.2',
            }
          ]
        },
        {
          key: '2',
          content: 'MenuItem-2.2',
        },
        {
          key: '3',
          on: 'hover',
          content: 'MenuItem-2.3',
          menu: [
            {
              key: '1',
              content: 'MenuItem-2.3.1',
            },
            {
              key: '2',
              content: 'MenuItem-2.3.2',
            }
          ]
        }
      ]
    }
  },
  {
    key: 'MenuItem-3',
    on: 'hover',
    content: 'MenuItem-3',
  },
  {
    key: 'LastIconButton',
    icon: <MoreIcon />
  }
]

function App() {
  const storedItemsData = localStorage.getItem('itemsData');
  const [items, setItems] = useState<any>(storedItemsData ? JSON.parse(storedItemsData) : itemsData);

  return (
    <>
      <Megamenu items={items} />
      <NavigationConfig menuItems={items} />
    </>
  );
}

export default App;
