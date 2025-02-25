const setup = require("./utilities")
const { events } = require("@budibase/backend-core")
const version = require("../../../../package.json").version

describe("/dev", () => {
  let request = setup.getRequest()
  let config = setup.getConfig()

  afterAll(setup.afterAll)

  beforeEach(async () => {
    await config.init()
    jest.clearAllMocks()
  })

  describe("revert", () => {
    it("should revert the application", async () => {
      await request
        .post(`/api/dev/${config.getAppId()}/revert`)
        .set(config.defaultHeaders())
        .expect("Content-Type", /json/)
        .expect(200)
      expect(events.app.reverted).toBeCalledTimes(1)
    })
  })

  describe("version", () => {
    it("should get the installation version", async () => {
      const res = await request
        .get(`/api/dev/version`)
        .set(config.defaultHeaders())
        .expect("Content-Type", /json/)
        .expect(200)

      expect(res.body.version).toBe(version)
      expect(events.version.checked).toBeCalledTimes(1)
      expect(events.version.checked).toBeCalledWith(version)
    })
  })
})