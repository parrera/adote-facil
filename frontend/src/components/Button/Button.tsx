import * as S from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: S.ButtonStyleTypes;
}

export function Button({
  children,
  onClick,
  buttonStyle = 'green-filled',
  ...props
}: ButtonProps) {
  return (
    <S.Button onClick={onClick} $buttonStyle={buttonStyle} {...props}>
      {children}
    </S.Button>
  );
}
