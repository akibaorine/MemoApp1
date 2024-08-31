import { Stack } from 'expo-router';

const Layout = (): JSX.Element => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#48D1CC',
        },
        headerTintColor: '#ffffff',
        headerTitle: 'SONAERU',
        headerBackTitle: 'Back',
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: 'bold',
        },
      }}
    >
      {/* スクリーンの設定 */}
      <Stack.Screen name="index" options={{ title: 'Memo List' }} />
      <Stack.Screen name="add" options={{ title: 'Add Memo' }} />
      <Stack.Screen name="memo/detail" options={{ title: 'Memo Detail' }} />
      <Stack.Screen name="memo/edit" options={{ title: 'Edit Memo' }} />
    </Stack>
  );
};

export default Layout;
