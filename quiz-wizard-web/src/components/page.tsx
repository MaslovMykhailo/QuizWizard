import Container, {ContainerProps} from '@material-ui/core/Container'

export function Page(props: ContainerProps) {
  return (
    <Container
      {...props}
      component="main"
    />
  )
}
