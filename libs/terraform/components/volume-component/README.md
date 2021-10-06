# Volume component

This package provides a volume hosted on [EFS](https://aws.amazon.com/efs/), served over the private network and restricted with security groups.

## Usage

```typescript
const volume = new VolumeComponent(this, 'vol', {
  vpcId: 'xxxxxxxx',
  subnetsIds: ['aaaaa', 'bbbbb'],
  clientsSecurityGroupsIds: ['ssssss'],
})
```
