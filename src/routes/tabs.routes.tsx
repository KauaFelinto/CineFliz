import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Screens/Home";
import { BookBookmark, BookmarkSimple, House, MagnifyingGlass, Play } from "phosphor-react-native";
import { Details } from "../Screens/Details";
import { MyList } from "../Screens/MyList/index.";
import { Search } from "../Screens/Search/index.";
import { Player } from "../Screens/Player/Player";

const {Navigator, Screen} = createBottomTabNavigator();

export function TabRoutes(){
    return (
        <Navigator 
        screenOptions={{
          tabBarStyle:{
            backgroundColor:'#262525',
            height:60,
            alignItems:'center',
            borderTopWidth:1,
            borderTopColor:'red'
          },
          headerShown:false,
          tabBarActiveTintColor:'red',
          tabBarInactiveTintColor:'#732a2a',
          tabBarShowLabel:false
        }}>
          <Screen name="Home" component={Home} options={{
            tabBarIcon: ({color}) =>(
              <House color={color} size={30} weight="light" />
            )
          }} />

          <Screen name="Details" component={Details} options={{
            tabBarButton: () => null
          }} />

          <Screen name="MyList" component={MyList} options={{
            tabBarIcon: ({color}) =>(
              <BookmarkSimple color={color} size={30} weight="light" />
            )
          }} />

          <Screen name="Search" component={Search} options={{
            tabBarIcon: ({color}) =>(
              <MagnifyingGlass color={color} size={30} weight="light" />
            )
          }} />
        </Navigator>
      );
}