class ApiResponse:
    def __init__(self, success = False, message = "", data = None):
        self.success = success
        self.message = message
        self.data = data

    def json(self):
        return {
            "success": self.success,
            "message": self.message,
            "data": self.data
        }