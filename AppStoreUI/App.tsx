import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowDownTrayIcon,
  Bars3CenterLeftIcon,
  BellIcon,
} from 'react-native-heroicons/solid';
import {storeColors} from './theme';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from './components/GradientButton';
import GameCard from './components/GameCard';

const categories = [
  'Action',
  'Family',
  'Puzzle',
  'Adventure',
  'Racing',
  'Education',
  'Others',
];
const featured = [
  {
    id: 1,
    title: 'Zooba',
    image: require('./assets/images/zooba.png'),
    downloads: '200k',
    stars: 4,
  },
  {
    id: 2,
    title: 'Subway Surfer',
    image: require('./assets/images/subway.png'),
    downloads: '5M',
    stars: 4,
  },
  {
    id: 3,
    title: 'Free Fire',
    image: require('./assets/images/freeFire.png'),
    downloads: '100M',
    stars: 3,
  },

  {
    id: 4,
    title: "Alto's Adventure",
    image: require('./assets/images/altosAdventure.png'),
    downloads: '20k',
    stars: 4,
  },
];

const games = [
  {
    id: 1,
    title: 'Shadow Fight',
    image: require('./assets/images/shadowFight.png'),
    downloads: '20M',
    stars: 4.5,
  },
  {
    id: 2,
    title: 'Valor Arena',
    image: require('./assets/images/valorArena.png'),
    downloads: '10k',
    stars: 3.4,
  },
  {
    id: 3,
    title: 'Frag',
    image: require('./assets/images/frag.png'),
    downloads: '80k',
    stars: 4.6,
  },
  {
    id: 4,
    title: 'Zooba Wildlife',
    image: require('./assets/images/zoobaGame.png'),
    downloads: '40k',
    stars: 3.5,
  },
  {
    id: 5,
    title: 'Clash of Clans',
    image: require('./assets/images/clashofclans.png'),
    downloads: '20k',
    stars: 4.2,
  },
];

function App(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = React.useState(categories[0]);

  return (
    <LinearGradient
      colors={['rgba(58, 131, 244, 0.4)', 'rgba(9, 181, 211, 0.4)']}
      className="flex-1 w-full">
      <SafeAreaView>
        <View className="container">
          <View className="flex-row justify-between items-center px-4">
            <Bars3CenterLeftIcon color={storeColors.text} size={30} />
            <BellIcon color={storeColors.text} size={30} />
          </View>

          {/* Categories */}
          <View className="mt-3 space-y-3">
            <Text
              style={{color: storeColors.text}}
              className="ml-4 text-3xl font-bold">
              Browse Games
            </Text>
            <View className="pl-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((cat: any) => {
                  if (cat === activeCategory) {
                    return (
                      <GradientButton
                        key={cat}
                        containerClass="mr-2"
                        value={cat}
                      />
                    );
                  }
                  return (
                    <TouchableOpacity
                      onPress={() => setActiveCategory(cat)}
                      key={cat}
                      className="bg-blue-200 p-3 px-4 rounded-full mr-2">
                      <Text>{cat}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          {/* Featured Row */}
          <View className="mt-3 space-y-4">
            <Text
              style={{color: storeColors.text}}
              className="ml-4 text-lg font-bold">
              Featured Games
            </Text>
            <View className="pl-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {featured.map((game: any) => {
                  return <GameCard key={game.id} game={game} />;
                })}
              </ScrollView>
            </View>
          </View>

          {/* Top action fames list */}
          <View className="mt-3 space-y-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text
                style={{color: storeColors.text}}
                className="ml-4 text-lg font-bold">
                Action Games
              </Text>
              <TouchableOpacity className="mr-4">
                <Text className="text-blue-600 font-bold">See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {games.map((game: any) => {
                return (
                  <TouchableOpacity
                    key={game.id}
                    className="mx-4 mb-2 p-2 flex-row">
                    <Image
                      source={game.image}
                      style={{width: 80, height: 80}}
                      className="rounded-2xl"
                    />
                    <View className="flex-1 flex justify-content pl-3 space-y-3">
                      <Text
                        style={{color: storeColors.text}}
                        className="font-semibold">
                        {game.title}
                      </Text>
                      <View className="flex-row space-x-1">
                        <Image
                          className="h-4 w-4 opacity-80"
                          source={require('./assets/images/fullStar.png')}
                        />
                        <Text className="text-xs text-gray-700">
                          {game.stars} stars
                        </Text>
                      </View>
                      <View className="flex-row space-x-1">
                        <ArrowDownTrayIcon
                          size={15}
                          className="text-blue-500"
                        />
                        <Text className="text-xs text-gray-700">
                          {game.downloads}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default App;
