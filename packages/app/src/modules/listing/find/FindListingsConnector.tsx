import * as React from "react";
import { Card } from "react-native-elements";
import { Text, ScrollView, TextInput, SafeAreaView } from "react-native";
import { SearchListings } from "@abb/controller";

interface State {
  name: string;
}

export class FindListingsConnector extends React.PureComponent<{}, State> {
  state = {
    name: ""
  };

  render() {
    const { name } = this.state;
    return (
      <React.Fragment>
        <SafeAreaView />
        <TextInput
          style={{ fontSize: 20, width: "100%" }}
          placeholder="search..."
          onChangeText={text => this.setState({ name: text })}
          value={name}
        />
        <SearchListings variables={{ input: { name }, limit: 5, offset: 0 }}>
          {({ listings }) => (
            <ScrollView style={{ marginTop: 10 }}>
              {listings.map(l => (
                <Card
                  key={`${l.id}-flc`}
                  title={l.name}
                  image={l.pictureUrl ? { uri: l.pictureUrl } : undefined}
                >
                  <Text style={{ marginBottom: 10 }}>
                    owner: {l.owner.email}
                  </Text>
                </Card>
              ))}
            </ScrollView>
          )}
        </SearchListings>
      </React.Fragment>
    );
  }
}
