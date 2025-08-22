import styled, { css } from 'styled-components';

import * as Select from '@radix-ui/react-select';

export const SelectTrigger = styled(Select.Trigger)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    background-color: ${theme.colors.gray[200]};
    color: ${theme.colors.gray[800]};
    border: 1px solid ${theme.colors.gray[500]};

    padding-left: 0.5rem;
  `}
`;

export const SelectValue = styled(Select.Value)`
  display: flex;
  align-items: center;
`;

export const SelectIcon = styled(Select.Icon)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid ${theme.colors.gray[500]};
    padding: 0.25rem;
    margin-left: 0.5rem;
  `}
`;

export const SelectContent = styled(Select.Content)`
  overflow: hidden;
  border-radius: 6px;
`;

export const SelectScrollUpButton = styled(Select.ScrollUpButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: var(--violet-11);
  cursor: default;
`;

export const SelectViewport = styled(Select.Viewport)`
  ${({ theme }) => css`
    padding: 0.5rem;
    background-color: ${theme.colors.gray[200]};
  `}
`;

export const SelectItem = styled(Select.Item)`
  display: flex;
  align-items: center;
  height: 25px;

  position: relative;
  user-select: none;

  font-size: 14px;

  line-height: 1;
  border-radius: 3px;
  padding-left: 1.25rem;
`;

export const SelectItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
