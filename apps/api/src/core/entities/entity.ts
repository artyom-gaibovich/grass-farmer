
export abstract class Entity<Props> {
    props: Props

    protected constructor(props: Props) {
        this.props = props
    }
}
