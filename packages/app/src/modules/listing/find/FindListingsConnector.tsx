import * as React from "react";
import { Card } from "react-native-elements";
import { Text, ScrollView } from "react-native";
import { withFindListings, WithFindListings } from "@abb/controller";

class C extends React.PureComponent<WithFindListings> {
  render() {
    const { listings } = this.props;
    return (
      <ScrollView style={{ marginTop: 10 }}>
        {listings.map(l => (
          <Card
            key={`${l.id}-flc`}
            title={l.name}
            image={l.pictureUrl ? { uri: l.pictureUrl } : undefined}
          >
            <Text style={{ marginBottom: 10 }}>owner: {l.owner.email}</Text>
          </Card>
        ))}
      </ScrollView>
    );
  }
}

export const FindListingsConnector = withFindListings(C);
