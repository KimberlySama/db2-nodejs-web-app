let ddl = [
    {
        tbName:"\"WEBSTORE\".\"CUSTOMER\"",
        ddl: "CREATE TABLE \"WEBSTORE\".\"CUSTOMER\"  (" +
        "\"C_SALUTATION\" VARCHAR(5 OCTETS) ," +
        "\"C_LAST_NAME\" VARCHAR(20 OCTETS) ," +
        "\"C_FIRST_NAME\" VARCHAR(20 OCTETS) ," +
        "\"C_CUSTOMER_SK\" INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY (" +
        " START WITH +1 " +
        "INCREMENT BY +1 " +
        "MINVALUE +1 " +
        "MAXVALUE +2147483647 " +
        "NO CYCLE " +
        "CACHE 20 " +
        "NO ORDER ) ) " +
        "IN \"USERSPACE1\" " +
        "ORGANIZE BY ROW",
        privilege:["ALTER TABLE \"WEBSTORE\".\"CUSTOMER\" ADD CONSTRAINT \"CUSTOMER_PK\" PRIMARY KEY (\"C_CUSTOMER_SK\") NOT ENFORCED"]
    },
    {
        tbName:"\"WEBSTORE\".\"INVENTORY\"",
        ddl: "CREATE TABLE \"WEBSTORE\".\"INVENTORY\"  ("+
        "\"INV_ITEM_SK\" INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY ("+
        " START WITH +1 "+
        "INCREMENT BY +1 "+
        "MINVALUE +1 "+
        "MAXVALUE +2147483647 "+
        "NO CYCLE "+
        "CACHE 20 "+
        "NO ORDER ) ,"+
        "\"INV_QUANTITY_ON_HAND\" INTEGER NOT NULL WITH DEFAULT 0 )"+
        "IN \"USERSPACE1\""+
        "ORGANIZE BY ROW",
        privilege:["ALTER TABLE \"WEBSTORE\".\"INVENTORY\" ADD CONSTRAINT \"ITEM_PK\" PRIMARY KEY(\"INV_ITEM_SK\") NOT ENFORCED"]
    },
    {
        tbName:"\"WEBSTORE\".\"WEBSALES\"",
        ddl:"CREATE TABLE \"WEBSTORE\".\"WEBSALES\"  ("+
        "\"WS_ORDER_NUMBER\" INTEGER NOT NULL GENERATED BY DEFAULT AS IDENTITY ( "+
        "START WITH +1 "+
        "INCREMENT BY +1 "+
        "MINVALUE +1 "+
        "MAXVALUE +2147483647 "+
        "NO CYCLE "+
        "CACHE 20 "+
        "NO ORDER ) , "+
        "\"WS_CUSTOMER_SK\" INTEGER , "+
        "\"WS_QUANTITY\" INTEGER NOT NULL WITH DEFAULT 1 , "+
        "\"WS_ITEM_SK\" INTEGER )   "+
        "IN \"USERSPACE1\"  "+
        "ORGANIZE BY ROW",
        privilege:[
            "ALTER TABLE \"WEBSTORE\".\"WEBSALES\" ADD CONSTRAINT \"ORDER_NUMBER_PK\" PRIMARY KEY (\"WS_ORDER_NUMBER\") NOT ENFORCED",
            "ALTER TABLE \"WEBSTORE\".\"WEBSALES\" ALTER COLUMN \"WS_ORDER_NUMBER\" RESTART WITH 21"
        ]
    },
    {
        tbName: "\"WEBSTORE\".\"TESTJSON\"",
        ddl:"CREATE TABLE \"WEBSTORE\".\"TESTJSON\"  ( "+
        "\"JSON_FIELD\" BLOB(4000) INLINE LENGTH 4000 LOGGED NOT COMPACT ) "+
        "IN \"USERSPACE1\"  "+
        "ORGANIZE BY ROW",
        privilege:[
            "ALTER TABLE \"WEBSTORE\".\"WEBSALES\" ADD CONSTRAINT \"CUSTOMER_SK\" FOREIGN KEY (\"WS_CUSTOMER_SK\") REFERENCES \"WEBSTORE\".\"CUSTOMER\" (\"C_CUSTOMER_SK\") ON DELETE NO ACTION ON UPDATE NO ACTION NOT ENFORCED TRUSTED ENABLE QUERY OPTIMIZATION",
            "ALTER TABLE \"WEBSTORE\".\"WEBSALES\" ADD CONSTRAINT \"ITEM_SK\" FOREIGN KEY (\"WS_ITEM_SK\") REFERENCES \"WEBSTORE\".\"INVENTORY\" (\"INV_ITEM_SK\") ON DELETE NO ACTION ON UPDATE NO ACTION NOT ENFORCED TRUSTED ENABLE QUERY OPTIMIZATION"
        ]
    }
]
module.exports.demo = function() {
    this.getDDL = () => ddl;
}