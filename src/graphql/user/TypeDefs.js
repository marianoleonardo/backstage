const TypeDefs= [`
    #JSON that defines a dashboard's configuration retrieved from database and parsed as string
    type Config {
        config: String!
    }

    #A stringified JSON that defines a dashboard's configuration
    input ConfigInput{
        config: String!
    }
`];

module.exports = TypeDefs;