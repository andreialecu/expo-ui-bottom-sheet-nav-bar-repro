import BottomSheet, { BottomSheetScrollView } from '@expo/ui/community/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// Android, edge-to-edge (the default since SDK 54): open the sheet, expand it,
// scroll the list. The rows stop above the navigation bar instead of scrolling
// under it, over a strip of the sheet's container colour, and the sheet gives
// no way to let content reach the screen edge and pad the list's end itself.
const ROWS = Array.from({ length: 40 }, (_, i) => i + 1);

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Button title="Open sheet" onPress={() => setOpen(true)} />
      {open ? (
        <BottomSheet
          enablePanDownToClose
          onClose={() => setOpen(false)}
          snapPoints={['50%', '100%']}
        >
          <BottomSheetScrollView>
            {ROWS.map((row) => (
              <View
                key={row}
                style={[styles.row, { backgroundColor: row % 2 ? '#4f7cff' : '#2b4fd1' }]}
              >
                <Text style={styles.text}>Row {row}</Text>
              </View>
            ))}
          </BottomSheetScrollView>
        </BottomSheet>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { height: 64, justifyContent: 'center', paddingHorizontal: 16 },
  text: { color: '#fff', fontSize: 16 },
});
