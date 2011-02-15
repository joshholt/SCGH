# ===========================================================================
# Project:   Scgh
# Copyright: ©2011 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore, :theme => :'sproutcore/ace'

local_proxy_to = "github.com"

proxy  "/api", :to => local_proxy_to, :protocol => 'http'

