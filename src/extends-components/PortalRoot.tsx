import styled from '@emotion/styled';

import { portalUtils } from '@/lib/utils';

const Container = styled.div(() => {
  return {};
});

export const PortalRoot = () => {
  return <Container id={portalUtils.id} />;
};
